class Card < ApplicationRecord
  belongs_to :user
  has_many :vocabularies, dependent: :destroy

  validates :title, presence: true, length: { minimum: 1, maximum: 20 }, uniqueness: true
  validates :status, presence: true
  enum :status, { secret: 0, open: 1 }
end
