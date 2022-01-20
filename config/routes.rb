Rails.application.routes.draw do
  
  namespace :backend do
    resources :saved_recipes, only: [:index, :show, :update, :destroy]
    # resources :users
    post "/add_user_recipe", to: "saved_recipes#user_create"
    post "/add_api_recipe", to: "saved_recipes#api_create"
    
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
