class User < ApplicationRecord
    has_secure_password
    has_many :bookings
    has_many :dance_classes, through: :bookings
    has_many :reviews, through: :dance_classes

    validates :email, presence: true, uniqueness: true
end