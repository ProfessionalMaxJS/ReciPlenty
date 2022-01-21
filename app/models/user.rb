class User < ApplicationRecord
    has_secure_password
    has_many :saved_recipes, dependent: :destroy

    validates :name, presence: true, uniqueness: true
    # validates :password, length: {minimum: 6}
end
