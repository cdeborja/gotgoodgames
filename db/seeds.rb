# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

Game.destroy_all
game1 = Game.create!(title: "Mario is missing",
        description: "You have to find mario",
        release_date: "29-01-1992")
game2 = Game.create(title: "Legend of Zelda",
        description: "A young boy journeys off to find Zelda",
        release_date: "21-02-1986")
game3 = Game.create!(title: "Notice me Senpai",
        description: "You have to talk to your Senpai... for forever",
        release_date: "01-01-2015")
game4 = Game.create!(title: "Tetris",
        description: "Match blocks, get points",
        release_date: "06-06-1984")
