class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :email, :default_timezone, :twitch_username, :avatar_url
end
