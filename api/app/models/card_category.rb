class CardCategory < ApplicationRecord
  belongs_to :card
  belongs_to :category

  validates :category_id, uniqueness: { scope: :card_id }
end
