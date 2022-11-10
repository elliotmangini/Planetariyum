class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :asset_kind, :file_name, :chosen_count, :art_url, :collection_card_back_url, :asset_url
  has_one :user
  has_one :collection
end
