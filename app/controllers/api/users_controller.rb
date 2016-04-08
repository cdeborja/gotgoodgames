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

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @users = User.all

    if params[:game_id]
      reviewed_users = []
      @users.each do |user|
        if user.reviews.where(game_id: params[:game_id]).count == 1
          reviewed_users << user
        end
      end
      render json: reviewed_users
    end

  end

end
