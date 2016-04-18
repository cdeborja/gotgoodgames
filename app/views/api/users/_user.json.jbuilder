json.extract!(
  user,
  :id, :username, :picture)

  # json.author_name post.author.name
  json.picture_url asset_path(user.picture.url)
  # Thank goodness we preloaded the author!
