class Collection < ApplicationRecord
  belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'
  has_one_attached :collection_art
  has_many :cards

  def cover_url
    Rails.application.routes.url_helpers.url_for(collection_art) if collection_art.attached?
  end
end
