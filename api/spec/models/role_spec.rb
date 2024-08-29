require "rails_helper"

RSpec.describe Role, type: :model do
  subject { create(:role) }

  context "factoryのデフォルトでカテゴリーを作成した場合" do
    it "正常にカテゴリーを作成できる" do
      expect { subject }.to change { Role.count }.by(1)
    end
  end

  describe "単語のロールのvalidation" do
    subject { role.valid? }

    let(:name) { Faker::Lorem.word }
    let(:role) { build(:role, name: name) }

    context "全ての値が正常な場合" do
      it "正常にroleを作成できる" do
        expect(subject).to be_truthy
      end
    end

    context "nameが空の場合" do
      let(:name) { "" }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(role.errors.full_messages).to eq [
          "品詞を入力してください",
        ]
      end
    end

    context "nameが15文字以上の場合" do
      let(:name) { Faker::Lorem.characters(number: 16) }
      it "エラーメッセージが返る" do
        expect(subject).to be_falsey
        expect(role.errors.full_messages).to eq [
          "品詞は15文字以内で入力してください",
        ]
      end
    end
  end
end
