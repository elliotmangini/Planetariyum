class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :email, :default_timezone, :twitch_username, :password_digest
end
