class Api::V1::Wordcard::CardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    cards = current_user.cards.includes(:user)
    render json: { card_list: cards }
  end

  def show
    card = current_user.cards.find(params[:id])
  end

  def create
    card = current_user.cards.new(card_params)

    if card.save
      render json: card.title
    else
      render json: { message: card.errors, status: :unprocessable_entity }
    end
  end

  def update
    card = current_user.cards.find(params[:id])

    card.update(card_params)
      render json: {message: "アップデートしました", status: :ok}
    rescue ActiveRecord::RecordInvalid => e
      render json: {message: e, status: :unprocessable_entity}
  end

  def destroy
  end

  private
  
    def card_params
      params.require(:card).permit(:title, :status)
    end
end
