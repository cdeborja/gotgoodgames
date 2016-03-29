class Game < ActiveRecord::Base

  validates :title, :description, :release_date, presence: true

  has_many(
    :reviews,
    class_name: "Review",
    primary_key: :id,
    foreign_key: :game_id
  )

  belongs_to(
    :gameshelf,
    class_name: "Gameshelf",
    primary_key: :id,
    foreign_key: :gameshelf_id
  )

  belongs_to(
    :wishlist,
    class_name: "Wishlist",
    primary_key: :id,
    foreign_key: :wishlist_id
  )

end
