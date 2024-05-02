FactoryBot.define do
  factory :card do
    user
    title { Faker::Lorem.word }
    status { :open }
  end
end
