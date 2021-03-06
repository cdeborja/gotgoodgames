class Game < ActiveRecord::Base

  include PgSearch
  multisearchable :against => :title,
                  :using => {
                  :tsearch => {:prefix => true}
                  }
  ## Below allows prefix search for games
  pg_search_scope :whose_title_starts_with,
                  :against => :title,
                  :using => {
                  :tsearch => {:prefix => true}
                  }


  validates :title, :description, :release_date, presence: true

  has_attached_file :cover, default_url: ""
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

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
