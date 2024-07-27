class StudyRecordService
  def initialize(records, date_list)
    @records = records
    @date_list = date_list
  end

  def group_record_by_title
    @records.group_by {|record| record.card.title}
  end

  def calculate_word_counts(records)
    word_counts_by_date = records.group_by(&:date).transform_values {
      |recs| recs.sum(&:word_count)}
    @date_list.map {|date| word_counts_by_date[date] || 0 }
  end

  def prepare_response
    grouped_records = group_record_by_title
    grouped_records.map do |card_title, records| 
      {
        title: card_title,
        word_counts: calculate_word_counts(records)
      }
    end
  end
end
