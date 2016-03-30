Rails.application.routes.draw do

  root to: "static_pages#homepage"

  resources :users, only: [:create, :new, :index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :games, only: [:create, :destroy, :index, :show, :update]
  end
end
