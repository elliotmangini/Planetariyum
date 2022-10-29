class User < ApplicationRecord
    has_secure_password
    validates :password, :length => { :minimum => 6 }
    validates_uniqueness_of :username, :case_sensitive => false
    validates :username, :length => { :in => 3..26}
    validates_uniqueness_of :email, :case_sensitive => false
end