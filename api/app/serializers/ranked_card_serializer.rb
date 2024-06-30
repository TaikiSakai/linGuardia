class RankedCardSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :user_name, :like

  def user_name
    object.user.name
  end

  def like
    current_user.like?(object)
  end
end
