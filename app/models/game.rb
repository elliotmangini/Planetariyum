class Game < ApplicationRecord

    validates_uniqueness_of :local_url, :case_sensitive => false

    belongs_to :collection
    has_many :nfts, -> { order(:id => :asc) }
    has_many :playings
    has_many :players, -> { order(:id => :asc) }, through: :playings
    has_one :room, as: :roomable
end
