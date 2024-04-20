class Api::V1::Wordcard::CardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    cards = current_user.cards.includes(:user)
    render json: { card_list: cards }, status: :ok
  end

  def show
    card = current_user.cards.find(params[:id])
    render json: { card: }, status: :ok
  end

  def create
    card = current_user.cards.new(card_params)

    card.save!
    render json: { title: card.title }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { message: e, status: :bad_request }, status: :bad_request
  end

  def update
    card = current_user.cards.find(params[:id])

    card.update!(card_params)
    render json: { message: "更新しました" }, status: :ok
  rescue ActiveRecord::RecordInvalid => e
    render json: { message: e, status: :bad_request }, status: :bad_request
  end

  def destroy
    card = current_user.cards.find(params[:id])
    card.destroy!
    render json: { message: "削除しました" }, status: :ok
  end

  private

    def card_params
      params.require(:card).permit(:title, :status)
    end
end
