class RemoveTokenHeadersMiddleware
    def initialize(app)
      @app = app
    end
  
    def call(env)
      status, headers, response = @app.call(env)
      headers.delete('access-token')
      headers.delete('client')
      headers.delete('uid')
      [status, headers, response]
    end
  end