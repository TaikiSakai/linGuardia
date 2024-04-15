class Card < ApplicationRecord
  belongs_to :user
  has_many :vocabularies, dependent: :destroy

  validates :title, presence: true, length: {minimum:1, maximum:20}
  validates :status, presence: true
  enum status: { private: 0, public: 1 }
end
