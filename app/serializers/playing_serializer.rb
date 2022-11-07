class PlayingSerializer < ActiveModel::Serializer
  attributes :id
  has_one :game
  has_one :user
end
