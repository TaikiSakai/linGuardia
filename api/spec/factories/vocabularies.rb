FactoryBot.define do
  factory :vocabulary do
    card
    word { Faker::Lorem.word }
    meaning { Faker::Lorem.word }

    transient do
      role_count { 0 }
    end

    after(:build) do |vocabulary, evaluator|
      vocabulary.roles << build_list(:vocabulary_roles, evaluator.role_count, vocabulary: vocabulary)
    end
  end
end
