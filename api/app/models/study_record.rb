class StudyRecord < ApplicationRecord
  belongs_to :user
  belongs_to :card

  validates :word_count, presence: true
  # dateが同じcard_idとuser_idの組み合わせに対してユニークであることを保証する
  validates :date, presence: true, uniqueness: { scope: [:card_id, :user_id] }
end
