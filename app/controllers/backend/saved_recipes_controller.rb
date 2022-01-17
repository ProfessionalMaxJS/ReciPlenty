class Backend::SavedRecipesController < ApplicationController
  before_action :set_saved_recipe, only: [:show, :update, :destroy]

  # GET /saved_recipes
  def index
    @saved_recipes = SavedRecipe.all

    render json: @saved_recipes
  end

  # GET /saved_recipes/1
  def show
    render json: @saved_recipe
  end

  def user_create
    user_create_params = saved_recipe_params.merge(:user_original? => true)
    @saved_recipe = SavedRecipe.new(user_create_params)

    if @saved_recipe.save
      render json: @saved_recipe, status: :created
    else
      render json: @saved_recipe.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /saved_recipes/1
  def update
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_saved_recipe
      @saved_recipe = SavedRecipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def saved_recipe_params
      params.require(:saved_recipe).permit(:title, :ingredients, :equipment, :instructions)
    end
end