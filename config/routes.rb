Rails.application.routes.draw do


  resources :users, only: [:create, :new, :show, :edit, :update]
  # resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:show, :create, :destroy]
    resources :games, only: [:index, :show]
    resources :reviews
    resources :users, only: [:create, :new]
  end

  root to: "static_pages#root"
  # get "*unmatched_routes", to: "static_pages#root"
end
