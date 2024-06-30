class Category < ApplicationRecorda
  has_many :card_categories, dependent: :destroy
  has_many :cards, through: :card_categories

  validates :name, presence: true, uniqueness: true
end
