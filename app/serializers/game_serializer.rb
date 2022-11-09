class GameSerializer < ActiveModel::Serializer
  attributes :id, :deadline, :game_type, :local_url, :collection_id
  has_many :nfts
end
