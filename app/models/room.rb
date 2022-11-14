class Room < ApplicationRecord
  belongs_to :roomable, polymorphic: true
  has_many :messages
end
