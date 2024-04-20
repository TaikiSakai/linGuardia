class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, null: false
  validates :meaning, allow_blank: true
end
