class Api::ReviewsController < ApplicationController

  def new
    @revew = Review.new
  end

  def create
    review = Review.new(review_params)
    game = Game.find(review.game_id)

    if game.reviews.find_by_user_id(review.user_id)
      redirect_to "/api/games/#{game.id}"
    elsif review.save
      redirect_to "/api/games/#{game.id}"
    else
      render json: review.errors.full_messages, status: 422
    end
  end

  def show
    review = Review.find(params[:id])
    render json: review
  end

  def index
    @reviews = Review.where("user_id = ?", params[:user_id])
    if @reviews
      render :index
    else
      errors
    end
  end

  def edit

  end

  def update
    review = Review.find(params[:id])
    if review.update(review_params)
      if params["review"]["game_page"]
        game = Game.find(review_params["game_id"])
        redirect_to "/api/games/#{game.id}"
      else
        @reviews = User.find(review.user_id).reviews
        render :index
      end
    end
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
    if params["game_page"]
      game = Game.find(review_params["game_id"])
      redirect_to "/api/games/#{game.id}"
    else
      @reviews = User.find(review.user_id).reviews
      render :index
    end
  end

  private

  def review_params
    params.require(:review).permit(:user_id, :game_id, :score, :body, :title)
  end
end
