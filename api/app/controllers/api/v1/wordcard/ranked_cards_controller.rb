class Api::V1::Wordcard::RankedCardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    cards = Card.where(status: "open").includes(:user, :likes, :categories). \
              order(number_of_access: "DESC").limit(5)
    liked_card_ids = current_user.likes.pluck(:card_id)

    render json: cards, each_serializer: CardSerializer, status: :ok, liked_card_ids: liked_card_ids
  end
end
