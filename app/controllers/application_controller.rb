class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

  private
  
  def render_unprocessable_entity_response(exception)
    render json: { errors: "this is a public service announcement...with guitars!" }, status: :unprocessable_entity
  end

  def authorize
    @current_user = User.find(session[:user_id])

    render json: { errors: "this is a public service announcement...with guitars!" }, status: :unauthorized unless @current_user
  end
end

#<ActiveRecord::RecordInvalid: Validation failed: Password can't be blank>