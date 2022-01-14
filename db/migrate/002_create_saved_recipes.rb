class CreateSavedRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :saved_recipes do |t|
      t.text :title
      t.text :ingredients
      t.text :equipment
      t.text :instructions
      t.boolean :cooked_by_user?, default: false
      t.boolean :user_original?
      t.string :original_url
      # t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
