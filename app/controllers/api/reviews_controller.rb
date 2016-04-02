class Api::ReviewsController < ApplicationController

  def new
    @revew = Review.new
  end

  def create
    review = Review.new(review_params)
    game = Game.find(review.game_id)
    if review.save
      render json: game
    else
      render json: review.errors.full_messages, status: 422
    end
  end

  def show
    @review = Review.find(params[:id])
  end

  def index
    @reviews = Review.all
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
