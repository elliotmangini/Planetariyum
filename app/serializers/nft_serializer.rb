class NftSerializer < ActiveModel::Serializer
  attributes :id, :edition, :scan_digest
  has_one :card
  has_one :game
  has_one :user
end
