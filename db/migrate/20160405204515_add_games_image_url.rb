class AddGamesImageUrl < ActiveRecord::Migration
  def change
    add_column :games, :image_url, :string
  end
end
