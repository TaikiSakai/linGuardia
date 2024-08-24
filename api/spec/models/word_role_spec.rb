require "rails_helper"

RSpec.describe WordRole, type: :model do
  subject { create(:word_role) }

  let(:vocabulary) { create(:vocabulary) }
  let(:role) { create(:role) }
  let(:word_role) { create(:word_role, vocabulary: vocabulary, role: role) }

  context "factoryのデフォルトでカテゴリーを作成した場合" do
    it "正常に中間テーブル:word_roleを作成できる" do
      expect { subject }.to change { WordRole.count }.by(1)
    end
  end

  describe "中間テーブル:word_roleのvalidation" do
    subject { word_role.valid? }

    context "全ての値が正常な場合" do
      it "正常に中間テーブル:word_roleを作成できる" do
        expect(subject).to be_truthy
      end
    end
  end

  describe "中間テーブルのリレーション" do
    before do
      word_role
    end

    context "word_role belongs to vocabulary and role" do
      it "word_roleに紐づくvocabularyとroleを取得できる" do
        expect(word_role.vocabulary_id).to eq vocabulary.id
        expect(word_role.role_id).to eq role.id
      end
    end

    context "role has many vocabularies" do
      it "roleに紐づくvocabularyが取得できる" do
        role.reload
        expect(role.vocabularies[0].id).to eq vocabulary.id
      end
    end

    context "vocabulary has many roles" do
      it "vocabularyに紐づくroleが取得できる" do
        vocabulary.reload
        expect(vocabulary.roles[0].id).to eq role.id
      end
    end
  end
end
