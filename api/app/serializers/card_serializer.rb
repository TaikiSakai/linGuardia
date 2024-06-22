class CardSerializer < ActiveModel::Serializer
  attributes :uuid, :title, :status, :user_name, :like, :number_of_likes, :created_at

  def user_name
    object.user.name
  end

  def like
    current_user.like?(object)
  end

  def number_of_likes
    object.how_many_likes(object)    
  end

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end
