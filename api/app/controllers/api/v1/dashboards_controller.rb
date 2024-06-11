class Api::V1::DashboardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    # ランキングで上位10を選出する
    cards = Card.where(status: "open").includes(:user)
    
    # binding.pry
    
    render json: cards, each_serializer: RankingSerializer, status: :ok
  end
end
