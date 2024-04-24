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
      raise ActiveRecord::Rollback unless save
    end
    true
  end

  def self.save_vocabulary_with_roles_test(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.new(vocabulary_params.permit(:word, :meaning))
        unless vocabulary.save
          return false
        end

        role_names = vocabulary_params[:role]
        roles = role_names.map { |name| Role.find_or_initialize_by(name: name) }

        vocabulary.roles = roles
        unless vocabulary.save
          return false
        end
      end      
    end
    true
  rescue ActiveRecord::Rollback
    false
  end
end
