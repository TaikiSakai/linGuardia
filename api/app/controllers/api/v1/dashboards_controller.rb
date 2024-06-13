class Api::V1::DashboardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    # ランキングで上位10を選出する
    cards = Card.where(status: "open").includes(:user).order(number_of_access: "DESC").limit(5)
    render json: cards, each_serializer: CardListSerializer, status: :ok
  end
end
