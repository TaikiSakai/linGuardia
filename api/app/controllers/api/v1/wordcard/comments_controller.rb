class Api::V1::Wordcard::CommentsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card, only: [:index, :create]

  def index
    comments = @card.comments.includes(:user).all.order(created_at: :DESC)

    render json: comments,each_serializer: CommentSerializer, status: :ok
  end

  def create
    comment = current_user.comments.new(comment_params)

    if comment.save
      render json: { message: "OK" }, status: :ok
    else
      render json: { error: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    comment = current_user.comments.find(params[:id])
    if comment.destroy
      render json: { message: "OK" }, status: :ok
    else
      render json: { error: comment.errors.full_messages }, status: :internal_server_error
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:body).merge(card_id: @card.id)
    end

    def set_card
      @card = Card.find_by(uuid: params[:card_uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end
end
