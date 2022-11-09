class User < ApplicationRecord
    has_secure_password
    has_many :bookings, dependent: :destroy
    has_many :dance_classes, through: :bookings
    has_many :reviews

    validates :email, presence: true, uniqueness: true
end
