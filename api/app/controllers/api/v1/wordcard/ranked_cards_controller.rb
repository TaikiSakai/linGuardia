class Api::V1::Wordcard::RankedCardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    # ページネーション対応
    # 検索機能対応
    cards = Card.where(status: "open").includes(:user)
    render json: cards, each_serializer: RankedCardSerializer, status: :ok
  end
end
