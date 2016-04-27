class Api::SearchesController < ApplicationController

  def index
    @search_results = User.whose_username_starts_with(params[:query]).concat(
      Game.whose_title_starts_with(params[:query]))
      render :index
  end

end

# @search_results = PgSearch
# .multisearch(params[:query])
# .page(params[:page])
# render :index
