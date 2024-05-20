class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    # サインアップ時に許可するパラメータを記述する
    def sign_up_params
      params.permit(:name, :email, :password)
    end

    def render_create_success
      render json: {
        message: resource_data(resource_json: @resource.token_validation_response)
      }
    end
end
