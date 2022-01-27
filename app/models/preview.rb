class Preview < ApplicationRecord
  belongs_to :user
  has_one_attached :pic
  
end
