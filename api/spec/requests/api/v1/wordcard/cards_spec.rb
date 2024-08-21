require "rails_helper"

RSpec.describe "Api::V1::Wordcard::Cards", type: :request do
  describe "GET api/v1/wordcard/cards" do
    subject { get(api_v1_wordcard_cards_path, headers:) }

    let(:current_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    context "ログインユーザーのcardが存在しない時" do
      it "正常にエラーが返る" do
        subject
        res = JSON.parse(response.body)
        expect(res.keys).to eq ["error"]
        expect(res["error"]).to eq "単語帳が登録されていません"
        expect(response).to have_http_status(:not_found)
      end
    end

    context "ログインユーザーのcardが存在する時cardの一覧を取得する" do
      it "正常にカードの一覧が取得できる" do
        create_list(:card, 5, status: :open, user: current_user)
        subject
        res = JSON.parse(response.body)
        expect(res[0].keys).to eq ["card", "user", "like", "categories"]
        expect(res[0]["card"].keys).to eq ["uuid", "title", "status", "created_at"]
        expect(res[0]["like"].keys).to eq ["like", "number_of_likes"]
        expect(res[0]["user"].keys).to eq ["user_id", "user_name"]
        expect(res[0]["categories"].keys).to eq ["name"]
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "POST api/v1/wordcard/cards" do
    subject { post(api_v1_wordcard_cards_path, headers: headers, params: params) }

    let(:headers) { current_user.create_new_auth_token }
    let(:current_user) { create(:user) }

    describe "ログインユーザーがcardを新規作成する時" do
      let(:params) do
        {
          card: attributes_for(:card),
          categories: attributes_for(:category),
        }
      end

      context "全ての値が正常かつカテゴリーが1つの時" do
        it "カードを正常に作成できる" do
          expect { subject }.to change { current_user.cards.count }.by(1)
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["card", "message"]
          expect(res["message"]).to eq "単語帳を作成しました"
          expect(response).to have_http_status(:ok)
        end
      end

      context "全ての値が正常かつカテゴリーが2つの時" do
        let(:params) do
          {
            card: attributes_for(:card),
            categories: attributes_for(:category,
                                       name: [Faker::Lorem.word, Faker::Lorem.word]),
          }
        end

        it "カードを正常に作成できる" do
          subject
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["card", "message"]
          expect(res["message"]).to eq "単語帳を作成しました"
          expect(response).to have_http_status(:ok)
        end
      end

      context "カードのタイトルが空欄であった場合" do
        let(:params) do
          {
            card: attributes_for(:card, title: ""),
            categories: attributes_for(:category),
          }
        end

        it "エラーメッセージが返る" do
          subject
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["error"]
          expect(res["error"]).to eq [
            "タイトルを入力してください",
            "タイトルは1文字以上で入力してください",
          ]
        end
      end

      context "タイトルが20文字以上であった場合" do
        let(:params) do
          {
            card: attributes_for(:card, title: Faker::Lorem.paragraph(sentence_count: 10)),
            categories: attributes_for(:category),
          }
        end

        it "エラーメッセージが返る" do
          subject
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["error"]
          expect(res["error"]).to eq ["タイトルは20文字以内で入力してください"]
          expect(response).to have_http_status(:bad_request)
        end
      end

      context "カテゴリーを入力せずにcardを登録した場合" do
        let(:params) do
          {
            card: attributes_for(:card),
            categories: attributes_for(:category, name: []),
          }
        end

        it "カードを正常に作成できる" do         
          subject
          
          res = JSON.parse(response.body)
          expect(res.keys).to eq ["card", "message"]
          expect(res["message"]).to eq "単語帳を作成しました"
          expect(response).to have_http_status(:ok)
        end
      end
    end
  end
end
