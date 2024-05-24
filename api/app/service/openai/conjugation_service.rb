module Openai
  class ConjugationService < RequestBase
    def chat(input)
      body = create_body(input)
      post_request(url: "/v1/chat/completions", body: body)
    end

    private

      def create_body(input)
        {
          model: @model,
          messages: [
            { role: "assistant",
              content:
                "Convert Spanish verb in the array input to various verb conjugations.
                Inputs are infinitive or conjugated verbs.
                Obey the following rules.
                1. You have to choose indicative or subjective mood.
                2. You have to choose only one tense at random.
                3. You have to select only one subject at random.
                4. If the input is not a verb, you have to return it as it is.
                5. If the input is conjugated, you have to convert it to other conjugation type.
                6. Do not output the same tense as the input.
                7. Return datas in the json format.
                  All you have to do is replace the word property value with the conjugated one.
                  Do not insert any additional property.
                  output example -> {id: number, word: string}
              " },
            { role: "user", content: input.to_s },
          ],
          max_tokens: 1200,
          temperature: 1,
        }.to_json
      end

      def parse_json_response
      end
  end
end
