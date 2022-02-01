class Backend::UsersController < ApplicationController
  # before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :authorize, only: [:create, :index]

def index
    render json: User.all, status: :ok
end

def show
    user = User.find(session[:user_id])
    render json: user, status: :ok
end

# def create
#   # byebug
#   new_user = User.create!(user_params)
#   session[:user_id] = new_user.id
#   # byebug
#   render json: new_user, status: :created 
# end

def create
  # byebug
  new_user = User.create!(user_params)
    session[:user_id] = new_user.id
    if new_user
  render json: {user: new_user}, status: :created
  else
    render json: {errors: "Invalid Username or Password"}, status: :unauthorized
  end
end

private

def user_params
    params.permit(:name, :password, :password_confirmation)
end

end
