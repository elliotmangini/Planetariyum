class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :display_name, :bio, :email, :default_timezone, :twitch_username, :site_theme, :custom_theme, :avatar_url
end
