class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_role, dependent: :destroy
  has_many :roles, through: :word_role
end
