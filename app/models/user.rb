class User < ApplicationRecord
    has_many :bookings
    has_many :dance_classes, through: :bookings
    has_many :reviews, through: :dance_classes
end
