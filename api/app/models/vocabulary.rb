class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, length: { maximum: 80 }
  validates :meaning, allow_blank: true, length: { maximum: 80 }
  validates :card_id, presence: true

  before_create -> { self.uuid = SecureRandom.uuid }

  scope :with_role, ->(role_name) { joins(:roles).where(roles: { name: role_name }) }

  def self.save_vocabulary_with_roles!(card:, vocabularies_params:)
    binding.pry
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.new(vocabulary_params.permit(:word, :meaning))

        role_names = vocabulary_params[:roles]
        vocabulary.roles = role_names.map {|name| Role.find_or_initialize_by(name: name) }

        vocabulary.save!
      end
    end
  rescue ActiveRecord::Rollback
    false
  end

  def self.update_vocabulary_with_roles!(card:, vocabularies_params:)
    
    binding.pry
    
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.find_by!(vocabulary_params.permit(:id))
        vocabulary.assign_attributes(vocabulary_params.permit(:word, :meaning))

        role_names = vocabulary_params[:roles]

        unless role_names.nil?
          vocabulary.roles.clear
          vocabulary.roles = role_names.map {|name| Role.find_or_initialize_by(name: name) }
        end

        vocabulary.save!
      end
    end
  rescue ActiveRecord::Rollback
    false
  end

  def save_vocabulary_with_roles_test(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        if vocabulary_params[:id].present?
          vocabulary = card.vocabularies.find_by!(vocabulary_params.permit(:id))
          vocabulary.assign_attributes(vocabulary_params.permit(:word))
        else
          vocabulary = card.vocabularies.new(vocabulary_params.permit(:word, :meaning))
        end
        
        
        # binding.pry
        
        roles = vocabulary_params[:roles]
        vocabulary.roles = roles.map {|name| Role.find_or_initialize_by(name: name) }

        vocabulary.save!
      end
    end
  rescue ActiveRecord::Rollback
    false
  end

  def self.update_verb_conjugation!(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.find_by!(vocabulary_params.permit(:id))
        vocabulary.assign_attributes(vocabulary_params.permit(:word))
        vocabulary.save!
      end
    end
  end
end
