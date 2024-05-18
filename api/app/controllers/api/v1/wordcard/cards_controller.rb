class Api::V1::Wordcard::CardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    cards = current_user.cards.all.order(created_at: :desc)

    if cards.empty?
      render json: { error: "単語帳が1つも登録されていません" }, status: :not_found
    else
      render json: cards, each_serializer: CardSerializer , status: :ok
    end
  end

  def create
    card = current_user.cards.new(card_params)

    card.save!
      render json: card, serializer: CardSerializer, status: :ok

  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def update
    card = current_user.cards.find_by!(uuid: params[:uuid])

    if card.update(card_params)
      render json: { message: "更新しました" }, status: :ok
    else
      render json: { errors: card.errors,
                     message: "更新に失敗しました" }, status: :bad_request
    end
  end

  def destroy    
    card = current_user.cards.find_by!(uuid: params[:uuid])

    card.destroy!
    render json: { message: "削除しました" }, status: :ok
  end

  private

    def card_params
      params.require(:card).permit(:title, :status)
    end
end
