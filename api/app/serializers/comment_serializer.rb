class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :body, :user_name

  def user_name
    object.user.name
  end
end
