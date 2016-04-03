class Api::ReviewsController < ApplicationController

  def new
    @revew = Review.new
  end

  def create
    review = Review.new(review_params)
    game = Game.find(review.game_id)
    if review.save
      redirect_to "/api/games/#{game.id}"
    else
      render json: review.errors.full_messages, status: 422
    end
  end

  def show
    @review = Review.find(params[:id])
  end

  def index
    reviews = Review.select("*").where("user_id = ?", params["user_id"])
    if reviews
      redirect_to "/user/#{params["user_id"]}"
    else
      errors
    end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def review_params
    params.require(:review).permit(:user_id, :game_id, :score, :body)
  end
end
