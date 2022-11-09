class NftSerializer < ActiveModel::Serializer
  attributes :id, :edition
  belongs_to :card
  belongs_to :game
  belongs_to :owner
  belongs_to :holder
end
