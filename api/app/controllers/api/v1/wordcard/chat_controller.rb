class Api::V1::Wordcard::ChatController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card

  def create
    vocabularies = @card.vocabularies.with_role("動詞")
    id_and_word = extract_id_and_word(vocabularies)

    openai = Openai::ConjugationService.new.chat([id_and_word])
    res = JSON.parse(openai.body)
    
    render json: res["choices"][0]["message"]["content"], status: :ok
  rescue NoMethodError
    raise "エラーが発生しました。しばらくたってからやり直してください。"
  end

  private

    def set_card
      @card = current_user.cards.find_by(uuid: params[:card_uuid])
      render json: { message: "単語帳が見つかりません" }, status: :not_found unless @card
    end

    def extract_id_and_word(vocabularies)
      vocabularies.map do |v|
        {
          id: v.id,
          word: v.word,
        }
      end
    end
end
