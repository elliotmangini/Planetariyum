class RoomSerializer < ActiveModel::Serializer
  attributes :id
  has_one :roomable
end
