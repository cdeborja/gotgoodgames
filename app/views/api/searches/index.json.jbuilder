# json.meta do
#   json.total_pages @search_results.total_pages
#   json.query params[:query]
#   json.page @search_results.current_page
# end

# json.array! @search_results.map(&:searchable) do |search_result|

json.search_results do
  json.array! @search_results.each do |search_result|
    case search_result
    when User
      json.partial!("api/users/user", user: search_result)
      # json._type "User"
    when Game
      json.partial!("api/games/game", game: search_result, show_reviews: false, show_ratings: false)
      # json._type "Game"
    end
    json._type search_result.class.to_s

    # # Metaprogramming for general case
    # tableized = search_result.class.to_s.tableize
    # json.partial!(
    #   "api/#{tableized}/#{tableized.singularize}",
    #   tableized.singularize.to_sym => search_result
    # )
  end
end
