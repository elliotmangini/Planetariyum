Rails.application.routes.draw do
  # resources :nfts
  resources :playings
  resources :vods
  resources :games, :only => [:create]
  resources :follows
  resources :publications
  resources :collections, :except => [:show]
  resources :cards
  resources :nfts

  # resources :users
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/avatar", to: "users#set_avatar"
  get "/users/:username", to: "users#get"

  get "collections/:local_url", to: "collections#find_by_local_url";

  #GAMES
  get "/games/:local_url", to: "games#get_live_game"

  #NFTS
  post "/nfts/:local_url/:staged_players", to: "nfts#start_game"

  patch "/nfts/claim/:id/:owner_id", to: "nfts#claim_nft"


end
