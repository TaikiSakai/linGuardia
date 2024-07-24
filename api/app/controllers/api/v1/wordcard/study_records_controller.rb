class Api::V1::Wordcard::StudyRecordsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card
  # before_action :record_already_exists, only: [:create]

  def index
    records = current_user.study_records.all
    
    binding.pry
    
    render json: { message: "okkkkk" }, status: :ok
  end

  def create
    record = current_user.study_records.new(study_record_params)
    
    # binding.pry
    
    # これだと正常系エラーとして処理されてしまう
    if record.save
      render json: { message: "登録しました"}, status: :ok
    else
      render json: { error: record.errors.full_messages }, status: :internal_server_error
    end
  end

  def show

  end

  private

    def study_record_params
      params.require(:study_record).permit(:word_count).merge(card_id: @card.id, date: Time.zone.today)
    end

    def set_card
      @card = Card.find_by(uuid: params[:card_uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end

    # def record_already_exists
    #   record = current_user.study_records.find_by(card_id: @card.id, date: Date.today)
    #   render json: { message: "今日は学習済みです" }, status: :ok unless record.nil?
    # end
end
