class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, length: { maximum: 80 }
  validates :meaning, allow_blank: true, length: { maximum: 80 }
  validates :card_id, presence: true

  before_create -> { self.uuid = SecureRandom.uuid }

  scope :with_role, ->(role_name) { joins(:roles).where(roles: { name: role_name }) }

  def self.create_vocabulary_with_roles(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.new(word: vocabulary_params[:word], meaning: vocabulary_params[:meaning])
        roles = vocabulary_params[:roles]
        
        if roles.empty? || roles == [""]
          vocabulary.roles = []
        else
          vocabulary.roles = roles.map {|name| Role.find_or_initialize_by(name: name) }
        end

        vocabulary.save!
      end
      [true, ""]
    end
  rescue ActiveRecord::RecordInvalid => e
    [false, e.record.errors.full_messages]
  end

  def self.update_vocabulary_with_roles(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        vocabulary = card.vocabularies.find_by!(id: vocabulary_params[:id])
        vocabulary.assign_attributes(word: vocabulary_params[:word], meaning: vocabulary_params[:meaning])
        roles = vocabulary_params[:roles]

        if roles.empty? || roles == [""]
          vocabulary.roles = []
        else
          vocabulary.roles = roles.map {|name| Role.find_or_initialize_by(name: name) }
        end

        vocabulary.save!
      end
      [true, ""]
    end
  rescue ActiveRecord::RecordInvalid => e
    [false, e.record.errors.full_messages]
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
