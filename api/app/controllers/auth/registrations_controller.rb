class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

    def render_create_success
      render json: {
        message: resource_data(resource_json: @resource.token_validation_response),
      }
    end
end
