json.array!(@games) do |game|
  json.partial!('game', game: game, show_reviews: false)
end
