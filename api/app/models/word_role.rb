class WordRole < ApplicationRecord
  belongs_to :vocabulary
  belongs_to :role

  # validates :role_id, presence: true, null: false, uniqueness: { scope: :vocabulary_id }
end
