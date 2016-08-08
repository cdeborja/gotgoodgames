class Api::UsersController < ApplicationController

  def create
    user_params = {username: params[:username],
      password: params[:password]}
    user = User.new(user_params)
    if user.save
      render json: {}
    else
      render json: {errors: user.errors.full_messages}
    end
  end

  def update
    @user = User.find(params[:id])
    @user.description = (params[:user][:description])
    @user.picture = (params[:user][:picture])
    @user.save
    render :show
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def index
    @users = User.all

    if params[:fiveUsers]
      topFive = []
      five_users = User.joins(:reviews).group("id").order("COUNT(users.id) DESC").limit(5)

      five_users.each do |user|

        gameId = user.reviews.last.game_id

        topFive << { "id" => user.id,
          "username" => user.username,
         "reviewsCount" => user.reviews.length,
         "picture" => user.picture.url,
         "recentlyReviewedGame" => Game.find(gameId)
         }
      end

      return render json: topFive
    end

    if params[:game_id]
      reviewed_users = []
      @users.each do |user|
        if user.reviews.where(game_id: params[:game_id]).count == 1
          reviewed_users << user
        end
      end
      return render json: reviewed_users
    end

    render :index

  end

end
