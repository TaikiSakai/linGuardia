class CardSerializer < ActiveModel::Serializer
  attribute :card do
    {
      uuid: object.uuid,
      title: object.title,
      status: object.status,
      created_at: created_at,
    }
  end

  attribute :user do
    {
      user_id: object.user_id,
      user_name: object.user.name,
    }
  end

  attribute :like do
    {
      like: like,
      number_of_likes: number_of_likes,
    }
  end

  def user_name
    object.user.name
  end

  def like
    current_user.like?(object)
  end

  def number_of_likes
    object.how_many_likes
  end

  def created_at
    object.created_at.strftime("%Y/%m/%d")
  end
end
