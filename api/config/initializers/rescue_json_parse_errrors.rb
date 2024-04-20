module Middleware
class RescueJsonParseErrors
  def initialize(app)
    @app = app
  end

  def call(env)
    @app.call(env)
    rescue ActionDispatch::Http::Parameters::ParseError => e
      [
        400, { 'Content-Type' => 'application/json' },
        [{ status: 400, error: 'You submitted a malformed JSON.', e: e }.to_json]
      ]
    end
  end
end

Rails.application.config.middleware.insert_before Rack::Head, Middleware::RescueJsonParseErrors
