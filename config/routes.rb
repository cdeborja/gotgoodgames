Rails.application.routes.draw do
  #implement later that a user can destroy its own account?
  resources :users, only: [:create, :new, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :games
end
