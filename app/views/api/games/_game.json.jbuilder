json.extract!(
  game,
  :id, :title, :description, :console, :release_date, :cover, :image_url
)


if show_reviews
  json.reviews do
    json.array!(game.reviews) do |review|
      json.partial!('reviews/review', review: review)
      json.user do
        json.id review.user.id
        json.username review.user.username
        json.picture review.user.picture
      end
    end
  end
end
