class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.text :body
      t.integer :user_id, null: false
      t.integer :game_id, null: false
      t.integer :score, null: false
      t.timestamps
    end
  end
end
