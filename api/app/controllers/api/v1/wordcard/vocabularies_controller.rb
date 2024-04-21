class Api::V1::Wordcard::VocabulariesController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
  
  end

  def create
    
    binding.pry
    
    vocabulary = Vocabulary.new(vocabulary_params)

    vocabulary.save!

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
