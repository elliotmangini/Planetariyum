class User < ApplicationRecord
    has_secure_password
    validates :password, :length => { :minimum => 6 }
    validates_uniqueness_of :username, :case_sensitive => false
    validates :username, :length => { :in => 3..26}
    validates_uniqueness_of :email, :case_sensitive => false

    has_one_attached :avatar
    has_many :cards, foreign_key: 'author_id'
    has_many :collections, foreign_key: 'creator_id'

    # FOLLOWER ALIASING
    has_many :follows
    # Allows association to view list of users who follow a given user i.e. user.followers
    has_many :follower_relationships, foreign_key: :following_id, class_name: 'Follow'
    has_many :followers, through: :follower_relationships, source: :follower
    # Allows association to view list of users who follow a given user i.e. user.following
    has_many :following_relationships, foreign_key: :follower_id, class_name: 'Follow'
    has_many :following, through: :following_relationships, source: :following





    def avatar_url
        Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    end
end