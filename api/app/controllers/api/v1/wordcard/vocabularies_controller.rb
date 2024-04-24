class Api::V1::Wordcard::VocabulariesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card, only: [:create, :update]

  def index
    card = current_user.cards.includes(:vocabularies).find_by(uuid: params[:card_uuid])
    vocabularies = card.vocabularies

    render json: vocabularies, each_serializer: VocabularySerializer, 
           params: { card_uuid: params[:card_uuid] }
  end

  def create  
    # vocabularies_params.each do |vocabulary_params|
    #   vocabulary = @card.vocabularies.new(vocabulary_params.permit(:word, :meaning))
    #   vocabulary.save_vocabulary_with_roles(role_names: vocabulary_params[:role])      
    # end
    # render json: { message: "単語を登録しました" }, status: :ok

    if Vocabulary.save_vocabulary_with_roles_test(card: @card, vocabularies_params: vocabularies_params)
      render json: { message: "単語を登録しました" }, status: :ok
    else
      render json: { message: "単語の登録に失敗しました" }, status: :unprocessable_entity
    end
  end

  def update
    vocabularies_params.each do |vocabulary_params|
      vocabulary = @card.vocabularies.find(vocabulary_params[:id])
      vocabulary.assign_attributes(vocabulary_params.permit(:word, :meaning))
      vocabulary.save_vocabulary_with_roles(role_names: vocabulary_params[:role])      
    end
    render json: { message: "単語を更新しました" }, status: :ok
  end

  def destroy
    
  end

  private
  
    def vocabularies_params
      # paramsを単語ごとに取り出して配列に入れる
      # 単語をまとめて登録するために使用する
      params.require(:vocabularies).map do |vocabulary_params|
        vocabulary_params.permit(:id, :word, :meaning, role: [])
      end
    end

    def set_card
      @card = current_user.cards.find_by(uuid: params[:card_uuid])
      render json: { message: "単語帳が見つかりません"}, status: :not_found unless @card
    end
end
