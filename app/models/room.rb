class Room < ApplicationRecord
  belongs_to :roomable, polymorphic: true
end
