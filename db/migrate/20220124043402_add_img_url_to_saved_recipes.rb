class AddImgUrlToSavedRecipes < ActiveRecord::Migration[6.1]
  def change
    add_column :saved_recipes, :api_img, :string
  end
end
