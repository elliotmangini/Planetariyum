class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :file_name, :rarity
  has_one :user
  has_one :collection
end
