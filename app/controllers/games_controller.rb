class GamesController < ApplicationController

  def new

  end

  def create

  end

  def show

  end

  def index

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def game_params
    params.require(:game).permit(:title, :description, :release_date)
  end
end
