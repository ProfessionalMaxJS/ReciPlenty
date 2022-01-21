class Backend::SavedRecipesController < ApplicationController
  before_action :set_saved_recipe, only: [:show, :update, :destroy]
  skip_before_action :authorize, only: [:show_all]

  # GET /saved_recipes
  def index
    render json: @current_user.saved_recipes.all
  end

  # GET /saved_recipes/1
  def show
    render json: @saved_recipe
  end

  def user_create
    user_create_params = saved_recipe_params.merge(:user_id => @current_user.id, :user_original => true)
    @saved_recipe = SavedRecipe.new(user_create_params)

    if @saved_recipe.save
      render json: @saved_recipe, status: :created
    else
      render json: @saved_recipe.errors, status: :unprocessable_entity
    end
  end

  def api_create
    api_create_params = saved_recipe_params.merge(:user_id => @current_user.id, :user_original => false, :source_url => params[:source_url])
    @saved_recipe = SavedRecipe.new(api_create_params)

    if @saved_recipe.save
      render json: @saved_recipe, status: :created
    else
      render json: @saved_recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /saved_recipes/1
  def update
    # render json: @saved_recipe
    if @saved_recipe.update(saved_recipe_params)
      render json: @saved_recipe
    else
      render json: @saved_recipe.errors, status: :unprocessable_entity
    end
  end

  # DELETE /saved_recipes/1
  def destroy
    @saved_recipe.destroy
  end

  def show_all
    render json: SavedRecipe.all, status: :ok
  end

  private
  #   # Use callbacks to share common setup or constraints between actions.
    def set_saved_recipe
      @saved_recipe = SavedRecipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def saved_recipe_params
      params.require(:saved_recipe).permit(:title, :ingredients, :instructions, :source_url, :cooked_by_user)
    end
end
