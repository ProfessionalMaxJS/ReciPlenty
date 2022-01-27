Rails.application.routes.draw do
  default_url_options :only_path => true

  namespace :backend do
    resources :users, only: [:index]
    post "/signup", to: "users#create"
    resources :saved_recipes, only: [:index, :show, :update, :destroy]
    post "/add_user_recipe", to: "saved_recipes#user_create"
    post "/add_api_recipe", to: "saved_recipes#api_create"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"   
    get "/logged_in", to: "sessions#show"
    get "/show_all", to: "saved_recipes#show_all"
    post "/generate_preview", to: "previews#create"

  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
