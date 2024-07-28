class Api::V1::Wordcard::StudyRecordsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_card, only: [:create]
  before_action :record_already_exists, only: [:create]

  def index
    date_range = Time.zone.today.beginning_of_week..Time.zone.today.end_of_week
  
    records = current_user.study_records.where(
      date: date_range,
    ).includes(:card)

    date_list = date_range.to_a
    serializer = StudyRecordService.new(records, date_list)
    records = serializer.prepare_response
    date_list = date_list.map { |d| d.strftime("%a-%d")}

    render json: { records: records, date_list: date_list }, status: :ok
  end

  def create
    record = current_user.study_records.new(study_record_params)

    if record.save
      render json: { message: "登録しました" }, status: :ok
    else
      render json: { error: record.errors.full_messages }, status: :internal_server_error
    end
  end

  private

    def study_record_params
      params.require(:study_record).permit(:word_count).merge(card_id: @card.id, date: Time.zone.today)
    end

    def set_card
      @card = Card.find_by(uuid: params[:card_uuid])
      render json: { error: "単語帳が見つかりません" }, status: :not_found unless @card
    end

    # 今日の学習レコードが存在するか確認し、存在する場合はステータスコード(OK)で処理を終了する
    def record_already_exists
      record = current_user.study_records.find_by(card_id: @card.id, date: Time.zone.today)
      render json: { message: "今日は学習済みです" }, status: :ok unless record.nil?
    end
end
