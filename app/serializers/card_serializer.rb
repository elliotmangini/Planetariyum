class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :asset_kind, :file_name, :chosen_count, :art_url, :asset_url
  has_one :user
  has_one :collection
end
