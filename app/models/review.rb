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
end
