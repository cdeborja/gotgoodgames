json.array! @reviews do |review|
  json.extract!(
  review,
  :id, :title, :score, :body, :user_id)

  json.game do
    json.id review.game.id
    json.title review.game.title
    json.image_url review.game.image_url
  end
end
