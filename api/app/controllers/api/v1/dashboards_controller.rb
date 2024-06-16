class Api::V1::DashboardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    # ランキングで上位10を選出する
    ranked_cards = Card.where(status: "open").includes(:user).order(number_of_access: "DESC").limit(5)
    render json: ranked_cards, each_serializer: RankedCardSerializer, status: :ok
  end
end
