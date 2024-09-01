class CardSerializer < ActiveModel::Serializer
  attribute :card do
    {
      uuid: object.uuid,
      title: object.title,
      status: object.status,
      created_at: object.created_at.strftime("%Y/%m/%d"),
    }
  end

  attribute :user do
    {
      user_id: object.user_id,
      user_name: object.user.name,
    }
  end

  attribute :like do
    liked_card_ids = instance_options[:liked_card_ids] || []
    {
      like: liked_card_ids.include?(object.id),
      number_of_likes: object.likes.size,
    }
  end

  attribute :categories do
    { name: object.categories.map(&:name) }
  end
end
