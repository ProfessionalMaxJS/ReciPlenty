class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  # has_many :saved_recipes
end
