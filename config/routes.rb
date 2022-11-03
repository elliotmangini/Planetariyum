Rails.application.routes.draw do
  resources :collections
  resources :cards

  resources :users
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/avatar", to: "users#set_avatar"
end
