# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
user1 = User.create!(username: "guest",
        password: "password")
user2 = User.create!(username: "banana",
        password: "password")
user3 = User.create!(username: "poatate",
        password: "password")
user4 = User.create!(username: "test",
        password: "password")
user5 = User.create!(username: "user",
        password: "password")

Game.destroy_all
game1 = Game.create!(title: "Mario is missing",
        description: "You have to find mario",
        release_date: "29-01-1992",
        console: "SNES")
game2 = Game.create(title: "Legend of Zelda",
        description: "A young boy journeys off to find Zelda",
        release_date: "21-02-1986",
        console: "NES")
game3 = Game.create!(title: "Notice me Senpai",
        description: "You have to talk to your Senpai... for forever",
        release_date: "01-01-2015",
        console: "Dreamcast")
game4 = Game.create!(title: "Tetris",
        description: "Match blocks, get points",
        release_date: "06-06-1984",
        console: "Game Boy")

Review.destroy_all
review1 = Review.create!(user_id: user1.id,
        game_id: game1.id, score: 2,
        body: "I couldn't find Mario! Help!")
review2 = Review.create!(user_id: user1.id,
        game_id: game2.id, score: 3,
        body: "I couldn't find Zelda! Help!")
review3 = Review.create!(user_id: user1.id,
        game_id: game3.id, score: 1,
        body: "I couldn't find Senpai! Help!")
review4 = Review.create!(user_id: user1.id,
        game_id: game4.id, score: 2,
        body: "I couldn't find Mario! Help!")
review5 = Review.create!(user_id: user2.id,
        game_id: game1.id, score: 5,
        body: "Found him, so easy!")
review6 = Review.create!(user_id: user2.id,
        game_id: game2.id, score: 5,
        body: "I love Zelda, great game!")
review7 = Review.create!(user_id: user3.id,
        game_id: game2.id, score: 1,
        body: "I prefer Sega..")
review8 = Review.create!(user_id: user3.id,
        game_id: game3.id, score: 5,
        body: "He finally noticed me! YAY!")
