class Api::V1::Current::LearningInformationsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    render json: current_user, serializer: LearningInformationSerializer
  end
end  