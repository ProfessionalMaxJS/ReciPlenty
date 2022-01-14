class SavedRecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :ingredients, :equipment, :instructions, :cooked_by_user?, :user_original?, :original_url
  has_one :user
end
