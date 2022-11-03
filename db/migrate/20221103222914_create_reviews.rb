class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :comment
      t.integer :rating
      t.references :user, null: false, foreign_key: true
      t.references :dance_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
