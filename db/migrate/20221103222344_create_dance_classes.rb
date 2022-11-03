class CreateDanceClasses < ActiveRecord::Migration[6.1]
  def change
    create_table :dance_classes do |t|
      t.string :category
      t.string :location
      t.date :date
      t.string :start_time
      t.integer :duration
      t.string :image

      t.timestamps
    end
  end
end
