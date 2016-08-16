json.extract!(
  review,
  :id, :body, :user_id, :game_id, :score, :title, :updated_at, :created_at
)

json.liked_users review.liking_users, :username, :id

if review.likes.where(user_id: current_user.id).length > 0
  json.set! :current_user_like_id, review.likes.where(user_id: current_user.id)[0].id
end
