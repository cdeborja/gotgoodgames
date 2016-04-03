class Api::UsersController < ApplicationController

  def create
    user_params = {username: params[:username],
      password: params[:password]}
    user = User.new(user_params)
    if user.save
      render json: {}
    else
      flash.now[:errors] = user.errors.full_messages
    end
  end

end
