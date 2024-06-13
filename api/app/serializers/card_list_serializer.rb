class CardListSerializer < ActiveModel::Serializer
  attributes :uuid, :title

  belongs_to :user
end
