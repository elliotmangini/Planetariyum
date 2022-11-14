class Game < ApplicationRecord

    belongs_to :collection
    has_many :nfts
    has_many :playings
    has_many :players, through: :playings
    has_one :room, as: :roomable
end
