class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseSetFakeSession

  before_action :configure_permitted_parameters, if: :devise_controller?
  
  # rescue_from ActionDispatch::Http::Parameters::ParseError do |_e|
    
  #   render json: { message: 'There was a problem in the your JSON' }
  # end
  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    end
end
