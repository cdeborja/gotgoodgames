
if params["review"]
  game = Game.find(params["review"]["game_id"])
elsif params["like"]
  game = Game.find(params["like"]["game_id"])
end

json.partial!('game', game: game, show_reviews: true, show_ratings: true)
