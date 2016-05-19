Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET']
  provider :twitch, ENV['TWITCH_CLIENT_ID'], ENV['TWITCH_CLIENT_SECRET']
  provider :twitch, ENV['TWITCH_CLIENT_ID_TEST'], ENV['TWITCH_CLIENT_SECRET_TEST']
end
