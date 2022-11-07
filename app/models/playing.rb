class Playing < ApplicationRecord
  belongs_to :player, foreign_key: 'player_id', class_name: 'User'
  belongs_to :game
end
