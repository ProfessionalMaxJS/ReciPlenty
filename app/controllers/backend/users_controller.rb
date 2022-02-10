class Backend::UsersController < ApplicationController
  # before_action :set_user, only: [:show, :update, :destroy]
  skip_before_action :authorize, only: [:create, :index]

def index
    render json: User.all, status: :ok
end

def show
    # user = User.find(session[:user_id])
    render json: @current_user, status: :ok
end

def create
  # byebug
  @new_user = User.create!(user_params)
  if(@new_user.valid?)
  session[:user_id] = @new_user.id
  render json: @new_user, status: :created
  end 
end

# def user_create
#   @saved_recipe = SavedRecipe.create!(user_create_params)

#   # if @saved_recipe.save
#     render json: @saved_recipe, status: :created
#   # else
#   #   render json: @saved_recipe., status: :unprocessable_entity
#   # end
# end

private

def user_params
    params.permit(:name, :password, :password_confirmation)
end

end
