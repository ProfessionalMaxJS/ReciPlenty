class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

  private
  
  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def authorize
    @current_user = User.find_by(id: session[:user_id])

    render json: { errors: ["Unauthorized Access Attempted"] }, status: :unauthorized unless @current_user
  end
end
