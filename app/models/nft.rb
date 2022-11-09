class Nft < ApplicationRecord
  validates :game_id, uniqueness: { scope: :card_id }

  belongs_to :card
  belongs_to :game
  belongs_to :owner, foreign_key: :owner_id, class_name: 'User'
  belongs_to :holder, foreign_key: :owner_id, class_name: 'User'

end
