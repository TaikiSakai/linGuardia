class Api::V1::Wordcard::ChatController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card

  def index
    vocabularies = @card.vocabularies.with_role("動詞")

    if vocabularies.empty?
      render json: { error: "単語が登録されていません" }, status: :not_found
    else
      render json: vocabularies, each_serializer: VocabularySerializer, status: :ok
    end
  end

  def generate_conjugations
    vocabularies = @card.vocabularies.with_role("動詞")

    openai = Openai::ConjugationService.new(vocabularies)
    response = openai.send_prompt
    new_vocabs = openai.assign_new_conjugations(response)

    render json: new_vocabs, each_serializer: VocabularySerializer, status: :ok
  rescue NoMethodError
    raise "エラーが発生しました。しばらくたってからやり直してください。"
  end

  private

    def set_card
      @card = current_user.cards.find_by(uuid: params[:card_uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end
end
