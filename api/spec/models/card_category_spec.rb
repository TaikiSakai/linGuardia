require "rails_helper"

RSpec.describe CardCategory, type: :model do
  subject { create(:card_category) }

  let(:card) { create(:card) }
  let(:category) { create(:category) }
  let(:card_category) { create(:card_category, card: card, category: category) }

  context "factoryのデフォルトでカテゴリーを作成した場合" do
    it "正常に中間テーブル:card_categoryを作成できる" do
      expect { subject }.to change { CardCategory.count }.by(1)
    end
  end

  describe "中間テーブル:card_categoryのvalidation" do
    subject { card_category.valid? }

    context "全ての値が正常な場合" do
      it "正常に中間テーブル:card_categoryを作成できる" do
        expect(subject).to be_truthy
      end
    end
  end

  describe "中間テーブルのリレーション" do
    before do
      card_category
    end

    context "card_category belongs to vocabulary and role" do
      it "word_roleに紐づくvocabularyとroleを取得できる" do
        expect(card_category.card_id).to eq card.id
        expect(card_category.category_id).to eq category.id
      end
    end

    context "category has many cards" do
      it "categoryに紐づくcardが取得できる" do
        category.reload
        expect(category.cards[0].id).to eq card.id
      end
    end

    context "card has many categories" do
      it "vocabularyに紐づくroleが取得できる" do
        card.reload
        expect(card.categories[0].id).to eq category.id
      end
    end
  end
end
