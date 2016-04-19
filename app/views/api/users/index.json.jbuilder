json.array!(@users) do |user|
  json.extract!(
  user,
  :id, :username, :description, :created_at, :picture

  )
end
