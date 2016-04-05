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
        console: "SNES",
        image_url: "http://img.gamefaqs.net/box/0/7/5/22075_front.jpg")
game2 = Game.create(title: "Legend of Zelda",
        description: "A young boy journeys off to find Zelda",
        release_date: "21-02-1986",
        console: "NES",
        image_url: "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png" )
game3 = Game.create!(title: "Notice me Senpai",
        description: "You have to talk to your Senpai... for forever",
        release_date: "01-01-2015",
        console: "Dreamcast",
        image_url: "https://s-media-cache-ak0.pinimg.com/736x/8c/3d/36/8c3d36765c1e9a80df4dfeb64128034e.jpg" )
game4 = Game.create!(title: "Tetris",
        description: "Match blocks, get points",
        release_date: "06-06-1984",
        console: "Game Boy",
        image_url: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Tetris_Boxshot.jpg/250px-Tetris_Boxshot.jpg"
        )
game5 = Game.create!(title: "TicTacToe",
        description: "The good ole game of playing 1 vs 1 in a test of wit...",
        release_date: "30-12-1977",
        console: "NES",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Tic_tac_toe.svg/2000px-Tic_tac_toe.svg.png")
game6 = Game.create!(title: "Megaman",
        description: "Pew. Pew. Pew.",
        release_date: "30-12-1987",
        console: "NES",
        image_url: "https://upload.wikimedia.org/wikipedia/en/d/dd/Mega_Man_1_box_artwork.jpg")
game7 = Game.create!(title: "Pac-Man",
        description: "Waka waka waka!",
        release_date: "20-10-1961",
        console: "ATARI",
        image_url: "https://upload.wikimedia.org/wikipedia/en/0/03/PacMan2600box.jpg")
game8 = Game.create!(title: "Sonic Adventure 2",
        description: "Just like Sonic Adventure 1, but better!",
        release_date: "11-02-2000",
        console: "Dreamcast",
        image_url: "https://upload.wikimedia.org/wikipedia/en/9/99/Sonic_Adventure_2_cover.png")
game9 = Game.create!(title: "Super Mario World",
        description: "Introducing... YOSHI!",
        release_date: "11-02-2000",
        console: "SNES",
        image_url: "https://upload.wikimedia.org/wikipedia/en/3/32/Super_Mario_World_Coverart.png")
game10 = Game.create!(title: "Final Fantasy Tactics",
        description: "The first ever tactical version of Final Fantasy",
        release_date: "28-01-1998",
        console: "Playstation",
        image_url: "https://upload.wikimedia.org/wikipedia/en/4/4b/Fftbox.jpg")
game11 = Game.create!(title: "Final Fantasy XV",
        description: "Used to be part of FFXIII storyline, but now it's own game!",
        release_date: "11-02-2000",
        console: "Playstation 4",
        image_url: "https://upload.wikimedia.org/wikipedia/en/9/99/Sonic_Adventure_2_cover.png")
game12 = Game.create!(title: "Superman",
        description: "Like Superman? Like Video Games? Here is Superman's worst game ever!",
        release_date: "31-05-1999",
        console: "N64",
        image_url: "https://upload.wikimedia.org/wikipedia/en/2/25/Final_Fantasy_XV_logo.png")
game13 = Game.create!(title: "Mortal Kombat",
        description: "Reboot of the famous franchise known for spilling out blood and creating the ESRB!",
        release_date: "19-04-2011",
        console: "Playstation 3",
        image_url: "https://upload.wikimedia.org/wikipedia/en/1/1f/Mortal_Kombat_box_art.png")
game14 = Game.create!(title: "Super Monkey Ball",
        description: "Not those kind of balls, balls with monkeys in them!",
        release_date: "18-11-2001",
        console: "Gamecube",
        image_url: "https://upload.wikimedia.org/wikipedia/en/9/96/Super_Monkey_Ball_Coverart.png")
game15 = Game.create!(title: "Super Dodge Ball Advance",
        description: "Every 小学生's dream... to be international Dodge Ball Players'",
        release_date: "11-06-2001",
        console: "Gameboy Advance",
        image_url: "https://upload.wikimedia.org/wikipedia/en/4/48/Superdodge.jpg")


Review.destroy_all
review1 = Review.create!(user_id: user4.id,
        game_id: game1.id, score: 2,
        body: "I couldn't find Mario! Help!")
review2 = Review.create!(user_id: user4.id,
        game_id: game2.id, score: 3,
        body: "I couldn't find Zelda! Help!")
review3 = Review.create!(user_id: user4.id,
        game_id: game3.id, score: 1,
        body: "I couldn't find Senpai! Help!")
review4 = Review.create!(user_id: user4.id,
        game_id: game4.id, score: 2,
        body: "I couldn't find the straight block! Help!")
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
