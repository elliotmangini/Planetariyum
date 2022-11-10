class Collection < ApplicationRecord
  belongs_to :creator, foreign_key: 'creator_id', class_name: 'User'
  has_one_attached :collection_art
  has_one_attached :card_back
  has_many :cards

  def cover_url
    Rails.application.routes.url_helpers.url_for(collection_art) if collection_art.attached?
  end

  def card_back_url
    Rails.application.routes.url_helpers.url_for(card_back) if card_back.attached?
  end
end
