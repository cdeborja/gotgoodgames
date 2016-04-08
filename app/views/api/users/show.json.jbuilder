json.extract!(
@user,
:id, :username, :description, :created_at, :picture
)

# json.picture_url @user.picture.url

json.reviews do
  json.array!(@user.reviews) do |review|
    json.extract!(
    review,
    :id, :title, :body, :score, :user_id
    )
  end
end
