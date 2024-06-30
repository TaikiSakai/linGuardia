class CardCategory < ApplicationRecord
  belongs_to :card
  belongs_to :category

  validate :category_id, uniqueness: { scope: :card_id }
end