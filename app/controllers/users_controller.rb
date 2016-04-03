class UsersController < ApplicationController
  #
  # def new
  #   @user = User.new
  # end

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

  # def index
  #   @users = User.all
  #   render :index
  # end

  ### Will be used later to update a user's information
  # def edit
  #   @user = User.find(params[:id])
  # end
  #
  # def update
  #   @user = User.find(params[:id])
  #
  #   if @user.update(user_params)
  #     flash[:success] = "Updated successfully"
  #     redirect_to root_url
  #   else
  #     flash.now[:errors] = @user.errors.full_messages
  #     render :edit
  #   end
  # end
  #
  # private

  # def user_params
  #   params.permit(:password, :username)
  # end
end
