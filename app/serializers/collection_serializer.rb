class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :cover_url, :description, :embed_url, :local_url, :featured_content, :card_back_url, :arena_art_url
  has_one :creator
end
