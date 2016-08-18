json.extract!(
  user,
  :id, :username, :picture)

  json.picture_url asset_path(user.picture.url)
