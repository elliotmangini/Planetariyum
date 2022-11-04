class PublicationSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :kind, :route, :runtime, :cover_url
end
