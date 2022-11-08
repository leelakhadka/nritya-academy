class UserWithBookingsSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :password, :password_digest
    has_many :bookings
  end
  