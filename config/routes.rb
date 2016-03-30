Rails.application.routes.draw do

  root to: "static_pages#homepage"

  resources :users, only: [:create, :new, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :games
end
