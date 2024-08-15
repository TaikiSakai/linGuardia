class StudyRecordService
  def initialize(records, date_list)
    @records = records
    @date_list = date_list
  end

  def calculate_word_counts(record)
    word_counts_by_date = record.group_by(&:date).transform_values {|recs| recs.sum(&:word_count) }
    @date_list.map {|date| word_counts_by_date[date] || 0 }
  end

  def calculate_daily_achievement(daily_aim)
    counts_today_learned = calculate_today_learned  
    
    if  daily_aim == 0 || counts_today_learned == 0
      0
    else
      ((counts_today_learned / daily_aim.to_f) * 100).to_i
    end
  end

  def calculate_today_learned
    @records.where(date: Time.zone.today).pluck(:word_count).sum
  end

  def calculate_yesterday_learned
    @records.where(date: Time.zone.yesterday).pluck(:word_count).sum
  end

  def group_records_by_title
    grouped_records = @records.group_by {|record| record.card.title }

    grouped_records.map do |card_title, record|
      {
        title: card_title,
        word_counts: calculate_word_counts(record),
      }
    end
  end
end
