FactoryBot.define do
  factory :card do
    user
    title { Faker::Lorem.word }
    status { :open }

    transient do
      category_count { 1 }
    end

    after(:build) do |card, evaluator|
      card.card_categories << build_list(:card_category, evaluator.category_count, card: card)
      # build_list(:card_category, evaluator.category_count, card: card, category: create(:category))
    end
  end
end
