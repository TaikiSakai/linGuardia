require "rails_helper"

RSpec.describe Vocabulary, type: :model do
  context "factoryのデフォルトに従い、単語を作成した場合" do
    let(:role) { create(:role) }
    subject { create(:vocabulary) }

    it "正常にレコードを新規作成できる" do      
      expect { subject }.to change { Vocabulary.count }.by(1)
    end
  end

  describe "Validations" do
    subject { vocabulary.valid? }

    let(:user) { create(:user) }
    let(:card) { create(:card) }
    let(:word) { Faker::Lorem.word }
    let(:meaning) { Faker::Lorem.word }
    let(:card_id) { card.id }
    let(:vocabulary) { build(:vocabulary, word: word, meaning: meaning, card_id: card_id) }

    context "すべての値が正常な時" do
      it "バリデーションに成功する" do
        expect(subject).to be_truthy
      end
    end

    context "wordが80文字以上で入力された場合" do
      let(:word) { Faker::Lorem.paragraph(sentence_count: 10) }

      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(vocabulary.errors.full_messages).to eq [
          "単語は80文字以内で入力してください",
        ]
      end
    end

    context "meaningが80文字以上で入力された場合" do
      let(:meaning) { Faker::Lorem.paragraph(sentence_count: 10) }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(vocabulary.errors.full_messages).to eq [
          "意味は80文字以内で入力してください",
        ]
      end
    end

    context "wordが空の時" do
      let(:word) { "" }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(vocabulary.errors.full_messages).to eq [
          "単語を入力してください",
        ]
      end
    end

    context "meaningが空の時" do
      let(:meaning) { "" }
      it "バリデーションに成功する" do
        expect(subject).to be_truthy
      end
    end

    context "vocabularyに紐づく単語帳が存在しない時" do
      let(:card_id) { SecureRandom.uuid }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(vocabulary.errors.full_messages).to eq [
          "Cardを入力してください",
        ]
      end
    end
  end
end