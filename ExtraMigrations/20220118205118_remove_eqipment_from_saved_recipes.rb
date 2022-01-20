class RemoveEqipmentFromSavedRecipes < ActiveRecord::Migration[6.1]
  def change
    remove_column :saved_recipes, :equipment, :text
    add_column :saved_recipes, :user, :belongs_to
  end
end
