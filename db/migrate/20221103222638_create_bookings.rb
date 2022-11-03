class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.integer :fee
      t.boolean :paid
      t.references :user, null: false, foreign_key: true
      t.references :dance_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
