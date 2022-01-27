class PreviewSerializer < ActiveModel::Serializer
  attributes :id, :preview_pic
  # has_one :user

  include Rails.application.routes.url_helpers

  def preview_pic
    # byebug
    if object.pic.attached?
      {
        url: rails_blob_url(object.pic)
      }
    end
  end

end
