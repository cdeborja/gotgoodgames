class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.integer :review_id, null: false

      t.timestamps
    end

    add_index :likes, [:user_id, :review_id], unique: true
  end
end
