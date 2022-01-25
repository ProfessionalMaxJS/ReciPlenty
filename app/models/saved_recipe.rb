class SavedRecipe < ApplicationRecord
  belongs_to :user
  has_one_attached :pic
  
  validates :title, presence: true, uniqueness: true
end
