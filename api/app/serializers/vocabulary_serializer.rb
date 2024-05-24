class VocabularySerializer < ActiveModel::Serializer
  # has_many :roles, serializer: RoleSerializer
  attributes :id, :word, :meaning
  attribute :roles_array, key: :roles

  def roles_array
    object.roles.pluck(:name)
  end
end
