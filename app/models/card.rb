class Card < ApplicationRecord
  belongs_to :user, foreign_key: 'author_id'
  belongs_to :collection

  has_one_attached :card_asset
  has_one_attached :card_art

  def collection_card_back_url
    self.collection.card_back_url
  end

  def art_url
    Rails.application.routes.url_helpers.url_for(card_art) if card_art.attached?
  end

  def asset_url
    Rails.application.routes.url_helpers.url_for(card_asset) if card_asset.attached?
  end
end
