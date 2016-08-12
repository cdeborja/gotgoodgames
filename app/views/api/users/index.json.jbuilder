json.array!(@users) do |user|
  json.extract!(
  user,
  :id, :username, :description, :created_at, :picture
  )
  json.set! :reviewsCount, user.reviews.length
end
