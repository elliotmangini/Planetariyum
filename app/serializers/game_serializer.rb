class GameSerializer < ActiveModel::Serializer
  attributes :id, :deadline, :game_type, :local_url, :deck_size
  has_many :nfts
  has_one :collection
  has_many :playings
  has_many :players
end
