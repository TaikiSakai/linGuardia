class Api::V1::Wordcard::VocabulariesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card, only: [:create, :update, :destroy]

  def index
    # 公開された単語帳の単語を取得できるようにするため、Cardモデルから直接抽出しています
    card = Card.find_by(uuid: params[:card_uuid])
    vocabularies = card.vocabularies.includes(:roles)

    if vocabularies.empty?
      render json: { error: "単語が登録されていません" }, status: :not_found
    else
      render json: vocabularies, each_serializer: VocabularySerializer, status: :ok
    end
  end

  def create
    status, error_message = Vocabulary.save_vocabulary_with_roles( \
      card: @card, vocabularies_params: vocabularies_params,
    )

    if status
      render json: { message: "単語を登録しました" }, status: :ok
    else
      render json: { error: error_message }, status: :internal_server_error
    end
  end

  def update
    status, error_message = Vocabulary.save_vocabulary_with_roles( \
      card: @card, vocabularies_params: vocabularies_params,
    )

    if status
      render json: { message: "単語を更新しました" }, status: :ok
    else
      render json: { error: error_message }, status: :internal_server_error
    end
  end

  def destroy
    vocabulary = @card.vocabularies.find(params[:id])
    if vocabulary.destroy
      render json: { message: "単語を削除しました" }, statu: :ok
    else
      render json: { message: vocabulary.errors.full_messages }, \
             status: :unprocessable_entity
    end
  end

  private

    def vocabularies_params
      # paramsを単語ごとに取り出して配列に入れる
      # 単語をまとめて登録するために使用する
      params.require(:vocabularies).map do |vocabulary_params|
        vocabulary_params.permit(:id, :word, :meaning, roles: [])
      end
    end

    def set_card
      @card = current_user.cards.find_by(uuid: params[:card_uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end
end
