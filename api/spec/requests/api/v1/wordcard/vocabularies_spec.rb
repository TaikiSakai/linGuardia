require "rails_helper"

RSpec.describe "Api::V1::Wordcard::Vocabularies", type: :request do
  describe "GET api/v1/wordcard/cards/vocabularies" do
    subject { get(api_v1_wordcard_card_vocabularies_path(uuid), headers:) }

    let(:current_user) { create(:user) }
    let(:other_user) { create(:user) }
    let(:headers) { current_user.create_new_auth_token }

    # index
    describe "ログインユーザーのcardに紐づくvocabulary" do
      describe "statusがopenのcard" do
        let(:current_user_card) { create(:card, user: current_user) }
        let(:uuid) { current_user_card.uuid }

        context "vocabularyが存在しない時" do
          it "正常にエラーが返る" do
            subject

            res = JSON.parse(response.body)
            expect(res.keys).to eq ["error"]
            expect(res["error"]).to eq "単語が登録されていません"
            expect(response).to have_http_status(:not_found)
          end
        end

        context "vocabularyが存在する場合、一覧を取得する" do
          it "正常にvocabularyの一覧を取得できる" do
            create_list(:vocabulary, 10, card: current_user_card)
            subject

            res = JSON.parse(response.body)
            expect(res[0].keys).to eq ["id", "word", "meaning", "roles"]
          end
        end
      end

      describe "statusがcloseの単語帳" do
        let(:current_user_card) { create(:card, status: :close, user: current_user) }
        let(:uuid) { current_user_card.uuid }

        context "vocabularyが存在しない場合" do
          it "正常にエラーが返る" do
            subject

            res = JSON.parse(response.body)
            expect(res.keys).to eq ["error"]
            expect(res["error"]).to eq "単語が登録されていません"
            expect(response).to have_http_status(:not_found)
          end
        end

        context "vocabularyが存在する場合、一覧を取得できる" do
          it "正常にvocabularyの一覧を取得できる" do
            create_list(:vocabulary, 10, card: current_user_card)
            subject

            res = JSON.parse(response.body)
            expect(res[0].keys).to eq ["id", "word", "meaning", "roles"]
          end
        end
      end
    end

    describe "他のユーザーのcardに紐づくvocabulary" do
      describe "statusがopenのcard" do
        let(:other_user_card) { create(:card, user: other_user) }
        let(:uuid) { other_user_card.uuid }

        context "vocabularyが存在しない時" do
          it "正常にエラーが返る" do
            subject

            res = JSON.parse(response.body)
            expect(res.keys).to eq ["error"]
            expect(res["error"]).to eq "単語が登録されていません"
            expect(response).to have_http_status(:not_found)
          end
        end

        context "vocabularyが存在する場合、一覧を取得する" do
          it "正常にvocabularyの一覧を取得できる" do
            create_list(:vocabulary, 10, card: other_user_card)
            subject

            res = JSON.parse(response.body)
            expect(res[0].keys).to eq ["id", "word", "meaning", "roles"]
          end
        end
      end

      describe "statusがcloseの単語帳" do
        let(:other_user_card) { create(:card, status: :close, user: other_user) }
        let(:uuid) { other_user_card.uuid }

        context "vocabularyが存在しない場合" do
          it "正常にエラーが返る" do
            subject

            res = JSON.parse(response.body)
            expect(res.keys).to eq ["error"]
            expect(res["error"]).to eq "単語帳が見つかりません"
            expect(response).to have_http_status(:not_found)
          end
        end

        context "vocabularyが存在する場合、一覧を取得できない" do
          it "正常にエラーが返る" do
            create_list(:vocabulary, 10, card: other_user_card)
            subject

            res = JSON.parse(response.body)
            expect(res.keys).to eq ["error"]
            expect(res["error"]).to eq "単語帳が見つかりません"
            expect(response).to have_http_status(:not_found)
          end
        end
      end
    end

    # create

    # update

    # delete
  end
end
