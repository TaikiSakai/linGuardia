require "rails_helper"

RSpec.describe Category, type: :model do
  subject { create(:category) }

  context "factoryのデフォルトでカテゴリーを作成した場合" do
    it "正常にカテゴリーを作成できる" do
      expect { subject }.to change { Category.count }.by(1)
    end
  end

  describe "カテゴリーのvalidation" do
    subject { category.valid? }

    let(:name) { Faker::Lorem.word }
    let(:category) { build(:category, name: name) }

    context "全ての値が正常な時" do
      it "正常にカテゴリーを作成できる" do
        expect(subject).to be_truthy
      end
    end

    context "nameが空欄の場合" do
      let(:name) { "" }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(category.errors.full_messages).to eq [
          "カテゴリー名を入力してください",
        ]
      end
    end

    context "nameに値が渡されなかった場合" do
      let(:name) { [] }
      it "エラーメッセージが返る" do
        expect(subject).to be_truthy
      end
    end

    context "nameが15文字以上で入力された場合" do
      let(:name) { Faker::Lorem.paragraph(sentence_count: 10) }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(category.errors.full_messages).to eq [
          "カテゴリー名は15文字以内で入力してください",
        ]
      end
    end
  end
end
