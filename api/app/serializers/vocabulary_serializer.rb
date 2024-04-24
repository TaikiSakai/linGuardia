class VocabularySerializer < ActiveModel::Serializer
  attributes :id, :word, :meaning, :roles
end
