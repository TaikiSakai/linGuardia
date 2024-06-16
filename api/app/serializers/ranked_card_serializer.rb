class RankedCardSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :user_name

  def user_name
    object.user.name
  end
end
