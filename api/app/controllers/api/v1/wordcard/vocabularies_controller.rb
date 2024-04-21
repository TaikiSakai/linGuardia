class Api::V1::Wordcard::VocabulariesController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    card = current_user.cards.includes(:vocabularies).find_by(uuid: params[:card_uuid])
    vocabularies = card.vocabularies

    render json: vocabularies, each_serializer: VocabularySerializer, 
           params: { card_uuid: params[:card_uuid] }
  end

  def create
    card = current_user.cards.find_by(uuid: params[:card_uuid])
    if card.nil?
      render json: { message: "単語帳が見つかりません" }, status: :not_found
      return
    end
  
    vocabularies_params.each do |vocabulary_params|
      vocabulary = card.vocabularies.new(vocabulary_params.permit(:word, :meaning))
      vocabulary.save_vocabulary_with_roles(role_names: vocabulary_params[:role])
    end
    render json: { message: "added the words" }, status: :ok
  rescue ActiveRecord::Rollback
    render json: { message: "単語の追加に失敗しました" }, status: :ok
  end

  # def create
  #   card = current_user,cards.find_by(uuid: params[:uuid])
  #   if card.nil?
  #     render json: { message: "単語帳が見つかりません" }, status: :not_found
  #     return
  #   end

  #   ActiveRecord::Base.transaction do
  #     vocabularies_params.each do |vocabulary_params|
  #       vocabulary = card.vocabularies.new(vocabulary_params.permit(:word, :meaning))

  #   end
  # end

  def update
  end

  def destroy
  end

  private
  
    def vocabularies_params
      # paramsを単語ごとに取り出して配列に入れる
      # 単語をまとめて登録するために使用する
      params.require(:vocabularies).map do |vocabulary_params|
        vocabulary_params.permit(:word, :meaning, role: [])
      end
    end

    # def rple_params(vocabulary)
    #   if params[:role].present?
    #     role = Role.find_by(name: params[:role])
    #   end
    # end
end
