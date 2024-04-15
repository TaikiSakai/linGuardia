class Role < ApplicationRecord
  has_many :word_role, dependent: :destroy
  has_many :vocabulary, through: :word_role
end
