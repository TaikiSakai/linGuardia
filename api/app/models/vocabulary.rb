class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, length: { maximum: 80 }
  validates :meaning, allow_blank: true, length: { maximum: 80 }
  validates :card_id, presence: true

  # クライエント側から見える値はuuidを使用する
  before_create -> { self.uuid = SecureRandom.uuid }

  def self.save_vocabulary_with_roles(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.new(vocabulary_params.permit(:word, :meaning))

        role_names = vocabulary_params[:role].uniq
        vocabulary.roles = role_names.map { |name| Role.find_or_initialize_by(name: name) }

        vocabulary.save!
      end      
    end
    true
  rescue ActiveRecord::Rollback
    false
  end

  def self.update_vocabulary_with_roles(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.find_by!(vocabulary_params.permit(:id))
        vocabulary.assign_attributes(vocabulary_params.permit(:word, :meaning))
        
        role_names = vocabulary_params[:role].uniq
        vocabulary.roles.clear
        vocabulary.roles = role_names.map { |name| Role.find_or_initialize_by(name: name) }

        vocabulary.save!
      end      
    end
    true
  rescue ActiveRecord::Rollback
    false
  end
end
