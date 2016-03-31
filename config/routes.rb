Rails.application.routes.draw do


  resources :users, only: [:create, :new, :index]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :games, only: [:index, :show]
  end

  root to: "static_pages#root"
  get "*unmatched_routes", to: "static_pages#root"
end
