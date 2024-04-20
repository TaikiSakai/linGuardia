class Role < ApplicationRecord
  has_many :word_roles, dependent: :destroy
  has_many :vocabularies, through: :word_roles

  validates :name, presence: true, null: false, uniqueness: true
end
