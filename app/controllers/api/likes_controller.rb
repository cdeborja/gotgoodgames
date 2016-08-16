class Api::LikesController < ApplicationController

  def create
    like = Like.new(like_params)
    game = Game.find(params["like"]["game_id"])
    if like.save!
      redirect_to "/api/games/#{game.id}"
    end
  end

  def index

  end

  def destroy
    like = Like.find(params[:id])
    like.destroy
    game = Game.find(params[:like][:game_id])
    redirect_to "/api/games/#{game.id}"
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :review_id)
  end
end
