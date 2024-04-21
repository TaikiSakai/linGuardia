class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, length: { maximum: 80 }
  validates :meaning, allow_blank: true, length: { maximum: 80 }
  validates :card_id, presence: true

  # front側から見える値はuuidを使用する
  before_create -> { self.uuid = SecureRandom.uuid }

  def save_vocabulary_with_roles(role_names:)
    ActiveRecord::Base.transaction do      
      self.roles = role_names.map { |name| Role.find_or_initialize_by(name: name) }
      unless save
        raise ActiveRecord::Rollback
        reeturn false
      end
    end
    true
  end
end
