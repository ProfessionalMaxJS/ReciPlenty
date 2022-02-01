class Backend::SessionsController < ApplicationController

  skip_before_action :authorize, only: [:create, :show, :destroy]

  def create
    # byebug
    user = User.find_by(name: params[:name])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      # byebug
    render json: {user: user, session: session }, status: :ok
    else
      render json: {error: "Invalid Username or Password"}, status: :unauthorized
    end
  end

  def show
    if(session[:user_id])
      render json: {logged_in: true, status: :ok}
    else
      render json: {logged_in: false, status: :unauthorized}
    end
  end

  def destroy
    # byebug
    session.delete :user_id
    render json: {}, status: :no_content
  end


end