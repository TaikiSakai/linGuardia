class Api::V1::HealthCheckController < ApplicationController
  def index
    render json: { status: "200 ok!" }, status: :ok
  end
end
