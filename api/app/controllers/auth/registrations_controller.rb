class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  include AssignToken
end
