Rails.application.routes.draw do
  
  namespace :backend do
    resources :saved_recipes, only: [:index, :show, :update, :destroy]
    resources :users, only: [:index]
    post "/add_user_recipe", to: "saved_recipes#user_create"
    post "/add_api_recipe", to: "saved_recipes#api_create"
    post "/signup", to: "users#create"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"   
    get "logged_in", to: "sessions#show"
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
