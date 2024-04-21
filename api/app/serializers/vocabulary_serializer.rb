class VocabularySerializer < ActiveModel::Serializer
  attributes :uuid, :word, :meaning, :card_id
end
