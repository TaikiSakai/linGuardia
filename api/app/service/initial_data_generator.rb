class InitialDataGenerator
  def initialize(user_id)
    @user = User.find(user_id)
  end

  def create_card    
    card = @user.cards.new(card_params[:card])
    card.save_with_categories(category_params: card_params[:categories])
    card
  end

  def create_vocabularies(card)
    Vocabulary.create_vocabulary_with_roles( \
       card: card, vocabularies_params: vocabularies_params[:vocabularies],
    )
  end

  private

    def card_params
      load_and_parse_json("public/data/initial_card_data.json")
    end

    def vocabularies_params
      load_and_parse_json("public/data/initial_vocabulary_data.json")
    end

    def load_and_parse_json(file_name)
      File.open(file_name) do |f|
        parsed_datas = JSON.load(f, nil, create_additions: false, symbolize_names: true)
      end
    end
end