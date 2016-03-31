json.extract!(
  game,
  :id, :title, :description, :release_date
)

if show_reviews
  json.reviews do
    json.array!(game.reviews) do |review|
      json.partial!('reviews/review', review: review)
    end
  end
end
