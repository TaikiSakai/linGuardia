class Vocabulary < ApplicationRecord
  belongs_to :card
  has_many :word_roles, dependent: :destroy
  has_many :roles, through: :word_roles

  validates :word, presence: true, length: { maximum: 80 }
  validates :meaning, allow_blank: true, length: { maximum: 80 }
  validates :card_id, presence: true

  before_create -> { self.uuid = SecureRandom.uuid }

  scope :with_role, ->(role_name) { joins(:roles).where(roles: { name: role_name }) }

  def self.save_vocabulary_with_roles(card:, vocabularies_params:)
    ActiveRecord::Base.transaction do
      vocabularies_params.each do |vocabulary_params|
        # vocabularyが見つからなかった場合は、新規作成する
        # 見つかった場合は、属性を更新する
        if vocabulary_params[:id].nil?
          vocabulary = card.vocabularies.new(word: vocabulary_params[:word], meaning: vocabulary_params[:meaning])
        else
          
          binding.pry
          
          vocabulary = card.vocabularies.find(vocabulary_params[:id])
          vocabulary.assign_attributes(word: vocabulary_params[:word], meaning: vocabulary_params[:meaning])
        end

        roles = vocabulary_params[:roles]
        vocabulary.roles = roles.empty? ? [] : roles.map {|name| Role.find_or_initialize_by(name: name) }

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

  def self.assign_roles(roles)
    if roles.empty?
      []
    else
      roles.map {|name| Role.find_or_initialize_by(name: name) }
    end
  end
end
