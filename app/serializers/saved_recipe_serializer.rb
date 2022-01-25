class SavedRecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :ingredients, :instructions, :cooked_by_user, :user_original, :source_url, :food_pic
  # has_one :user

  include Rails.application.routes.url_helpers

  def food_pic
    if object.pic.attached?
      {
        url: rails_blob_url(object.pic)
      }
    else
      {
        url: object.api_img
      }
    end
  end
end
