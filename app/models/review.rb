class Review < ActiveRecord::Base

  validates :body, :user_id, :game_id, :score, presence: true

  belongs_to(
    :game,
    class_name: "Game",
    primary_key: :id,
    foreign_key: :game_id
  )

  belongs_to(
    :user,
    class_name: "User",
    primary_key: :id,
    foreign_key: :user_id
  )

  has_many :likes
  has_many :liking_users, :through => :likes, :source => :user

end
