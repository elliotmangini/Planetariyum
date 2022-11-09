class CardSerializer < ActiveModel::Serializer
  attributes :id, :name, :asset_kind, :file_name, :chosen_count
  has_one :user
  has_one :collection
end
