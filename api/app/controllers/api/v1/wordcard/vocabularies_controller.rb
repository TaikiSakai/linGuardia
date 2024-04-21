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

    if card
      vocabulary = card.vocabularies.new(vocabulary_params)
      vocabulary.save
      render json: { message: "added the word"}
    else
      render json: { message: "単語帳が見つかりませんでした"}, status: :bad_request
    end
  end

  def update
  end

  def destroy
  end

  private

    def vocabulary_params
      params.require(:vocabulary).permit(:word, :meaning)
    end
end
