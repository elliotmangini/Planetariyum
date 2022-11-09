class Playing < ApplicationRecord
  validates :player, uniqueness: { scope: :game_id}

  belongs_to :player, foreign_key: 'player_id', class_name: 'User'
  belongs_to :game

end
