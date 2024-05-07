FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) {|n| "#{n}_" + Faker::Internet.email }
    password { "password" }
    confirmed_at { Time.current }
  end
end
