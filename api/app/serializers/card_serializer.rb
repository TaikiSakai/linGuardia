class CardSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :status, :created_at

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end