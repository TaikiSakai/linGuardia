class StudyRecordSerializer < ActiveModel::Serializer
  attributes :card_id, :card_title, :date
 
  attribute :word_count do
    {
      test: object.word_count,
    }
  end

  def card_id
    
    binding.pry
    
    object.card.id
  end

  def card_title
    object.card.title
  end
end