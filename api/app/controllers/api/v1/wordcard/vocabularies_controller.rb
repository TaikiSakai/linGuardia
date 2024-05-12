class Api::V1::Wordcard::VocabulariesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card

  def index
    vocabularies = @card.vocabularies.includes(:roles)

    if vocabularies.empty?
      render json: { message: "単語が登録されていません"}, status: :not_found
    else
      render json: vocabularies, each_serializer: VocabularySerializer, status: :ok
    end
  end

  def create
    if Vocabulary.save_vocabulary_with_roles(card: @card, vocabularies_params: vocabularies_params)
      render json: { message: "単語を登録しました" }, status: :ok
    else
      render json: { message: "単語の登録に失敗しました" }, status: :unprocessable_entity
    end
  end

  def update
    if Vocabulary.update_vocabulary_with_roles(card: @card, vocabularies_params: vocabularies_params)
      render json: { message: "単語を更新しました" }, status: :ok
    else
      render json: { message: "単語の更新に失敗しました" }, status: :unprocessable_entity
    end
  end

  
  def destroy
    vocabulary = @card.vocabularies.find(params[:id])
    vocabulary.destroy!
    render json: { message: "削除しました" }, statu: :ok    
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
      render json: { message: "単語帳が見つかりません"}, status: :not_found unless @card
    end
end
