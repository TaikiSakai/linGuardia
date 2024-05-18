class CardSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :created_at

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end