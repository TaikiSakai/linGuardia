FactoryBot.define do
  factory :role do
    name { ["名詞", "動詞", "形容詞", "形容詞"].sample }
  end
end
