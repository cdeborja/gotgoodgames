json.extract!(
@user,
:id, :username, :description
)

json.reviews do
  json.array!(@user.reviews) do |review|
    json.extract!(
    review,
    :id, :title, :body, :score
    )
  end
end
