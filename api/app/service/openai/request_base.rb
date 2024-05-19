module Openai
  class RequestBase
    def initialize(model: "gpt-3.5-turbo", timeout: 30)
      @model = model

      @request = Faraday.new(url: "https://api.openai.com") do |req|
        req.headers["Content-Type"] = "application/json"
        req.headers["Authorization"] = "Bearer #{ENV["OPENAI_ACCESS_TOKEN"]}"
        req.options[:timeout] = timeout
        req.adapter Faraday.default_adapter
      end
    end

    def post_request(url: "/", body: {})
      @request.post(url) {|req| req.body = body }
    rescue Faraday::TimeoutError
      raise StandardError, "タイムアウトになりました"
    end
  end
end
