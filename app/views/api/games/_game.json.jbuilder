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

if show_ratings

  game.reviews.each do |review|
    @review_count = @review_count + 1
    @score = @score + review.score
  end

  average = @score/@review_count

  json.set! :averageRating, average
  json.set! :reviewCount, @review_count
end
