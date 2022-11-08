class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :cover_url, :description, :embed_url, :local_url, :featured_content
  has_one :creator
end
