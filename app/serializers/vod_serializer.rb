class VodSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :game
end
