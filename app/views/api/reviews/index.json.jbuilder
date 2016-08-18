json.array! @reviews do |review|
  json.extract!(
  review,
  :id, :title, :score, :body, :user_id)

  json.liked_users review.liking_users, :username, :id
  
  if review.likes.where(user_id: current_user.id).length > 0
    json.set! :current_user_like_id, review.likes.where(user_id: current_user.id)[0].id
  end
  json.game do
    json.id review.game.id
    json.title review.game.title
    json.image_url review.game.image_url
  end
end
