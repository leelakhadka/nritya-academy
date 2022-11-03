class BookingSerializer < ActiveModel::Serializer
  attributes :id, :fee, :paid
  has_one :user
  has_one :dance_class
end
