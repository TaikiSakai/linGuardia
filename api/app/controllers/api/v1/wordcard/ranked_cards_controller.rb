class Api::V1::Wordcard::RankedCardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    # ページネーション対応
    # 検索機能対応
    cards = Card.where(status: "open").includes(:user).order(number_of_access: "DESC").limit(5)
    render json: cards, each_serializer: CardSerializer, status: :ok
  end
end
