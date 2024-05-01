class WordRole < ApplicationRecord
  belongs_to :vocabulary
  belongs_to :role

  validates :role_id, uniqueness: { scope: :vocabulary_id }
end

