class Api::SessionsController < ApplicationController

  def show
    if signed_in?
      render json: current_user
    else
      render json: { message: "Not signed in!!!" }, status: 401
    end
  end

  def create
    user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if user && user.valid_password?(params[:password])
      sign_in(user)
      render json: user
    else
      render json: { message: "Invalid credentials!"}, status: 401
    end
  end

  def destroy
    sign_out

    render json: {}
  end

end
