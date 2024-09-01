class Api::V1::Wordcard::CardsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card, only: [:update, :destroy]

  def index
    cards = current_user.cards.includes(:user, :likes, :categories).order(created_at: :desc)
    liked_card_ids = current_user.likes.pluck(:card_id)

    if cards.empty?
      render json: { error: "単語帳が登録されていません" }, status: :not_found
    else
      render json: cards, each_serializer: CardSerializer, liked_card_ids: liked_card_ids
    end
  end

  def show
    card = Card.find_by(uuid: params[:uuid])
    liked_card_ids = current_user.likes.pluck(:card_id)

    if card
      # cardの所有者であれば、ステータスの状態に関わらずアクセスできる
      if owner?(card)
        render json: card, each_serializer: CardSerializer,
               status: :ok, liked_card_ids: liked_card_ids

      # 所有者でない場合、ステータスがopenならアクセスできる、アクセス数をカウントする
      elsif card.status == "open"
        card.count_access_number
        render json: card, each_serializer: CardSerializer,
               status: :ok, liked_card_ids: liked_card_ids
      else
        render json: { error: "単語帳が見つかりません" }, status: :not_found
      end
    else
      render json: { error: "単語帳が見つかりません" }, status: :not_found
    end
  end

  def create
    card = current_user.cards.new(card_params)

    if card.save_with_categories(category_params: category_params)
      render json: { card: card, message: "単語帳を作成しました" }, status: :ok
    else
      render json: { error: card.errors.full_messages }, status: :bad_request
    end

  # statusのenumに範囲外の値が渡された場合の例外メッセージ
  rescue ArgumentError
    render json: { error: "ステータスが無効です" }, status: :bad_request
  end

  def update
    @card.assign_attributes(card_params)

    if @card.save_with_categories(category_params: category_params)
      render json: { message: "単語帳を更新しました" }, status: :ok
    else
      render json: { error: @card.errors.full_messages }, status: :bad_request
    end

  # statusのenumに範囲外の値が渡された場合の例外メッセージ
  rescue ArgumentError
    render json: { error: "ステータスが無効です" }, status: :bad_request
  end

  def destroy
    if @card.destroy
      render json: { message: "単語帳を削除しました" }, status: :ok
    else
      render json: { error: @card.errors.full_messages },
             status: :internal_server_error
    end
  end

  def search
    q = Card.ransack(search_params)
    cards = q.result(distinct: true).all. \
              includes(:user, :categories).order(created_at: :desc)

    # 自分の単語帳とステータスがopenの単語帳だけに絞り込む
    my_cards = cards.select {|card| card.user_id == current_user.id }
    others_cards = cards.select {|card| card.status == "open" }
    cards = my_cards + others_cards

    if cards.empty?
      render json: { message: "単語帳が見つかりません" }, status: :not_found
    else
      render json: cards, each_serializer: CardSerializer, status: :ok
    end
  end

  private

    def card_params
      params.require(:card).permit(:title, :status)
    end

    def category_params
      params.require(:categories).permit(name: [])
    end

    def search_params
      params.require(:q).permit(:title_cont, :categories_name_cont)
    end

    def set_card
      @card = current_user.cards.find_by(uuid: params[:uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end

    def owner?(card)
      current_user == card.user
    end
end
