class Review < ApplicationRecord
  belongs_to :user
  belongs_to :dance_class
end
