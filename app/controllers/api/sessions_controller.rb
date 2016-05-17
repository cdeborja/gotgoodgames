class Api::SessionsController < ApplicationController

  def show
    @current_user = current_user
    if signed_in?
      render :show
    else
      render json: { message: "Not signed in!!!" }, status: 401
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )
    debugger
    if @user && @user.valid_password?(params[:password])
      sign_in(@user)
      render :new
    else
      render json: { message: "Invalid credentials!"}, status: 401
    end
  end

  def destroy
    sign_out

    render json: {}
  end

end
