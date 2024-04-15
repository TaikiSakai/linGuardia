class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, uniqueness: true
  validates :meaning, allow_blank: true
end
