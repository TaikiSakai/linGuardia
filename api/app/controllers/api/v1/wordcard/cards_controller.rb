class Api::V1::Wordcard::CardsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    cards = current_user.cards.all

    if cards.empty?
      render json: { message: "単語帳が登録されていません" }, status: :ok
    else
      render json: { cards: cards } , status: :ok
    end
  end

  def create
    card = current_user.cards.new(card_params)

    if card.save
      render json: { message: "単語帳を作成しました" }, status: :ok
    else
      render json: { errors: card.errors.full_messages,
                     message: "単語帳を作成できません" }, status: :bad_request
    end
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
