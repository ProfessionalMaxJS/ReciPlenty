Rails.application.routes.draw do
  
  namespace :backend do
    resources :saved_recipes
    resources :users
    post "/add_user_recipe", to: "saved_recipes#user_create"
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
