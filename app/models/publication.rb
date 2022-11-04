class Publication < ApplicationRecord
    has_one_attached :cover_image

    def cover_url
        Rails.application.routes.url_helpers.url_for(cover_image) if cover_image.attached?
    end
end
