class Category < ApplicationRecord
  has_many :card_categories, dependent: :destroy
  has_many :cards, through: :card_categories

  validates :name, presence: true, uniqueness: true, length: { maximum: 15 }
end
