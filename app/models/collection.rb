class Collection < ApplicationRecord
  belongs_to :user, foreign_key: 'creator_id'
  has_one_attached :collection_art

  def cover_url
    Rails.application.routes.url_helpers.url_for(collection_art) if collection_art.attached?
  end
end
