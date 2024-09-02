require "rails_helper"

RSpec.describe Card, type: :model do
  context "factoryのデフォルトに従い、カードを作成した場合" do
    subject { create(:card) }

    it "正常にレコードを新規作成できる" do
      expect { subject }.to change { Card.count }.by(1)
    end
  end

  describe "Validations" do
    subject { card.valid? }

    let(:user) { create(:user) }
    let(:title) { Faker::Lorem.word }
    let(:status) { :open }
    let(:category_name) { Faker::Lorem.word }
    let(:card) { build(:card, title: title, status: status, user: user) }

    context "すべての値が正常な時" do
      it "バリデーションに成功する" do
        expect(subject).to be_truthy
      end
    end

    context "ステータスが公開かつ、タイトルが空の時" do
      let(:title) { "" }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(card.errors.full_messages).to eq [
          "タイトルを入力してください",
          "タイトルは1文字以上で入力してください",
        ]
      end
    end

    context "タイトルが20文字以上で入力された場合" do
      let(:title) { Faker::Lorem.paragraph(sentence_count: 10) }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(card.errors.full_messages).to eq [
          "タイトルは20文字以内で入力してください",
        ]
      end
    end

    context "ステータスが空の時" do
      let(:status) { "" }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(card.errors.full_messages).to eq ["ステータスを入力してください"]
      end
    end

    context "ユーザーが同じタイトルのcardを登録していた時" do
      let!(:existing_card) { create(:card, user: user) }
      let(:title) { existing_card.title }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(card.errors.full_messages).to eq ["タイトルはすでに存在します"]
      end
    end
  end
end
