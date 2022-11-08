class Nft < ApplicationRecord
  belongs_to :card
  belongs_to :game
  belongs_to :user
end
