class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :cover_url
  has_one :user
end
