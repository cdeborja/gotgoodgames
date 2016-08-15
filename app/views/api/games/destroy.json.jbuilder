game = Game.find(params["review"]["game_id"])
json.partial!('game', game: game, show_reviews: true, show_ratings: true)
