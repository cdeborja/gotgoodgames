
if params[:like][:current_user_page_id]
  user = User.find(params[:like][:current_user_page_id])
end

json.array!(user.reviews) do |review|
  game = Game.find(review.game_id)

  json.extract!(
  review,
  :id, :title, :body, :score, :user_id
  )

  json.game do
    json.id game.id
    json.title game.title
    json.image_url game.image_url
  end

  json.liked_users review.liking_users, :username, :id
end
