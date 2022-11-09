class Nft < ApplicationRecord
  validates :game_id, uniqueness: { scope: :card_id }

  belongs_to :card
  belongs_to :game, optional: true
  belongs_to :owner, optional: true, foreign_key: :owner_id, class_name: 'User'
  belongs_to :holder, optional: true, foreign_key: :owner_id, class_name: 'User'

end
