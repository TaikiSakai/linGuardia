class Card < ApplicationRecord
  belongs_to :user
  has_many :vocabularies, dependent: :destroy
end
