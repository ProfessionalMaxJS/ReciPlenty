class SavedRecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :ingredients, :instructions, :cooked_by_user, :user_original, :source_url
  has_one :user
end
