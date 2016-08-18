class Api::LikesController < ApplicationController

  def create
    like = Like.new(like_params)
    if like.save!
      if params[:like][:game_id]
        game = Game.find(params[:like][:game_id])
        redirect_to "/api/games/#{game.id}"
      else
        user_id = params[:like][:current_user_page_id]
        redirect_to "/api/users/#{user_id}/reviews"
      end
    end
  end

  def index

  end

  def destroy
    like = Like.find(params[:like][:id])
    like.destroy
    if params[:like][:game_id]
      game = Game.find(params[:like][:game_id])
      redirect_to "/api/games/#{game.id}"
    else
      user_id = params[:like][:current_user_page_id]
      redirect_to "/api/users/#{user_id}"
    end
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :review_id)
  end
end
