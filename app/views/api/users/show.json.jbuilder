json.extract!(
@user,
:id, :username, :description, :created_at, :picture
)

json.reviews do
  json.array!(@user.reviews.order("updated_at")) do |review|
    json.extract!(
    review,
    :id, :title, :body, :score, :user_id
    )
  end
end
