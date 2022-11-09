class NftSerializer < ActiveModel::Serializer
  attributes :id, :edition 
  has_one :card
  belongs_to :game
  belongs_to :owner
  belongs_to :holder
end
