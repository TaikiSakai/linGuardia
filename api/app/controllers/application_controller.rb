class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseSetFakeSession
  include ActionController::Cookies

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :confirm_token

  protected

    # サインアップ、アカウント情報更新時に許可するパラメーターの設定
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :language_level, :learing_language, :daily_aim])
    end

  private

    def confirm_token
      return if cookies[:token].nil?

      token = JSON.parse(Base64.decode64(CGI.unescape(cookies[:token])))

      request.headers["access-token"] = token["access-token"]
      request.headers["client"] = token["client"]
      request.headers["uid"] = token["uid"]

      # レスポンスヘッダーから認証情報を削除する
      response.headers.delete_if {|key| auth_headers_data.include?(key) }
    end

    def auth_headers_data
      {
        "access-token" => response.headers["access-token"],
        "client" => response.headers["client"],
        "uid" => response.headers["uid"],
      }
    end
end
