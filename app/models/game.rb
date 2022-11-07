class Game < ApplicationRecord

    belongs_to :collection
    has_many :playings
    has_many :players, through: :playings
end
