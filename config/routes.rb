Rails.application.routes.draw do
  
  root to: "sessions#new"

  resources :users, only: [:create, :new, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :games
end
