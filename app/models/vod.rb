class Vod < ApplicationRecord
  belongs_to :user, foreign_key: 'streamer_id'
  belongs_to :game
end
