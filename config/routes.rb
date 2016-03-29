Rails.application.routes.draw do
  #implement later that a user can destroy its own account?
  resources :user, only: [:create, :new]
  resource :session, only: [:new, :create, :destroy]
end
