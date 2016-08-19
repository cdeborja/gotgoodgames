class Api::GamesController < ApplicationController

  def new

  end

  def create

  end

  def show
    @game = Game.find(params[:id])
    if @game
      render :show
    else
      flash.now(:errors)
    end
  end

  def index

    page = params[:page].to_i

    @games = Game.all.page(1).per(16 * page)
    @review_count
    @score

    render :index
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :release_date, :console)
  end
end
