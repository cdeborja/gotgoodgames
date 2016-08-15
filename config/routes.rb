Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:create, :new, :show, :edit, :update]

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:show, :create, :destroy]
    resources :games, only: [:index, :show, :update, :destroy]
    resources :reviews
    resources :users, only: [:create, :new, :update, :show, :index] do
      resources :reviews, only: [:index]
    end
    resources :searches, only: [:index]
  end

  # get "*unmatched_routes", to: "static_pages#root"
    get "auth/facebook/callback", to: "omniauth#facebook"
    get "auth/twitch/callback", to: "omniauth#twitch"
end
