class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    # サインアップ時に許可するパラメータを記述する
    def sign_up_params
      params.permit(:name, :email, :password)
    end
end
