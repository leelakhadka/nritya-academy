class DanceClassSerializer < ActiveModel::Serializer
  attributes :id, :category, :location, :date, :start_time, :duration, :image
end
