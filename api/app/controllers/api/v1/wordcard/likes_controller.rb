class Api::V1::Wordcard::LikesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card

  def create
    card_like = current_user.likes.new(card_id: @card.id)
    if card_like.save
      render json: { message: "OK" }, status: :ok
    else
      render json: { error: card_like.errors.full_messages }, status: :conflict
    end
  end

  def destroy
    card_like = @card.likes.find_by(user_id: current_user.id)

    if card_like.destroy
      render json: { message: "OK" }
    else
      render json: { error: card_like.errors.full_messages }
    end
  end

  private

    def set_card
      @card = Card.find_by(uuid: params[:card_uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end
end
