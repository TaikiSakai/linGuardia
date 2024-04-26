class WordRole < ApplicationRecord
  belongs_to :vocabulary
  belongs_to :role

  validates :vocabulary_id, presence: true
  validates :role_id, presence: true
  validates :role_id, uniqueness: { scope: :vocabulary_id }
end
