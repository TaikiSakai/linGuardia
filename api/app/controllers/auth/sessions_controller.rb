class Auth::SessionsController < DeviseTokenAuth::SessionsController
  include AssignToken
end
