class RankingSerializer < ActiveModel::Serializer
  attributes :uuid, :title

  belongs_to :user
end
