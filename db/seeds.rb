require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

mario = File.open('app/assets/images/Mario.jpg')
luigi = File.open('app/assets/images/Luigi.png')
megaman = File.open('app/assets/images/Megaman.jpg')
sub_zero = File.open('app/assets/images/Sub-Zero.jpg')
naruto = File.open('app/assets/images/Naruto.jpg')
l_block = File.open('app/assets/images/L-Block.png')
sonic = File.open('app/assets/images/Sonic.jpg')
cloud = File.open('app/assets/images/Cloud.jpg')
superman = File.open('app/assets/images/Superman.jpg')

User.destroy_all
user1 = User.create!(username: "guest",
        password: "password",
        description: "Hello, it's me I was wondering if after all these years you'd like to meet To go over everything They say that time's supposed to heal ya But I ain't done much healing... ")
user2 = User.create!(username: "Mario",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: mario)
user3 = User.create!(username: "Luigi",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: luigi)
user4 = User.create!(username: "Megaman",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: megaman)
user5 = User.create!(username: "Sub-Zero",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: sub_zero)
user6 = User.create!(username: "Naruto",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: naruto)
user7 = User.create!(username: "L-Block",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: l_block)
user8 = User.create!(username: "Sonic",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: sonic)
user9 = User.create!(username: "Cloud",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: cloud)
user10 = User.create!(username: "Superman",
        description: Faker::Hacker.say_something_smart,
        password: "password",
        picture: superman)

Game.destroy_all
game1 = Game.create!(title: "CHECK ME!",
        description: "Hey there! Welcome to gotgoodgames. On this site, you can rate and review games and see how other users have reviewed games. Each game page will contain game details as well as user reviews (if there are any). You can navigate to your reviews and ratings via the navigation bar at the top through 'My Stats'. There, it will contain all the reviews and ratings you have created and allow you to edit or delete them.",
        release_date: "25-04-1987",
        console: "WELCOME",
        image_url: "http://s3.amazonaws.com/gotgoodgames-dev/games/covers/000/000/001/original/button.png?1470332135")
game2 = Game.create!(title: "Mario is missing",
        description: "You have to find mario",
        release_date: "25-04-1987",
        console: "SNES",
        image_url: "http://img.gamefaqs.net/box/0/7/5/22075_front.jpg")
game3 = Game.create(title: "Legend of Zelda",
        description: "A young boy journeys off to find Zelda",
        release_date: "21-02-1986",
        console: "NES",
        image_url: "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png" )
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
        image_url: "https://upload.wikimedia.org/wikipedia/en/2/25/Final_Fantasy_XV_logo.png")
game12 = Game.create!(title: "Superman",
        description: "Like Superman? Like Video Games? Here is Superman's worst game ever!",
        release_date: "31-05-1999",
        console: "N64",
        image_url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Superman64box.jpg")
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
        description: "Every 小学生's dream... to be international Dodge Ball Player",
        release_date: "11-06-2001",
        console: "Gameboy Advance",
        image_url: "https://upload.wikimedia.org/wikipedia/en/4/48/Superdodge.jpg")

random_covers = ["http://orig13.deviantart.net/fa64/f/2010/186/2/1/portal_2_xbox_360_game_cover_by_lastshadow1.png",
                "https://upload.wikimedia.org/wikipedia/commons/f/fc/King_Arthur_The_Role-playing_Wargame_cover_art.jpg",
                "http://vgboxart.com/boxes/PC/12994-portal-old-full.jpg",
                "https://assets.vg247.com/current//2011/04/20110412portal224.jpg",
                "http://img11.deviantart.net/22dd/i/2010/047/1/7/gta__ny_xbox_360_by_davidsmith1.jpg"]
30.times do
  Game.create!(title: Faker::Book.title,
        description: Faker::Hipster.paragraph(5),
        release_date: ((rand(27)+1).to_s + "-" + (rand(12)+1).to_s + "-" + (1940 + rand(75)).to_s),
        console: Faker::Hipster.words(1).first.upcase,
        image_url: random_covers.sample)
end


Review.destroy_all
review1 = Review.create!(user_id: user4.id,
        game_id: game2.id, score: 1,
        title: "I couldn't find Mario! Help!",
        body: "Afte playing this game for so many days, I couldn't find him. The visuals were poor and I wouldn't play this again! UGH!")
review2 = Review.create!(user_id: user4.id,
        game_id: game3.id, score: 1,
        title: "I couldn't find Zelda! Help!",
        body: "This game sucked! I never want to play it again!")
review3 = Review.create!(user_id: user4.id,
        game_id: game4.id, score: 1,
        title: "I couldn't find the straight block! Help!",
        body: "I made my board so high up, but a stright block never appeared! There's a bug in the system, I'm sure!")
review4 = Review.create!(user_id: user2.id,
        game_id: game2.id, score: 5,
        title: "Found him, so easy!",
        body: "This was a great game and so easy!")
review5 = Review.create!(user_id: user2.id,
        game_id: game3.id, score: 5,
        title: "I love Zelda, great game!",
        body: "Definitely would play it again!")
review6 = Review.create!(user_id: user3.id,
        game_id: game3.id, score: 1,
        title: "I prefer Sega..",
        body: "Don't play this game, go play games like Sonic Adventure 2!")
review7 = Review.create!(user_id: user6.id,
        game_id: game3.id, score: 5,
        title: Faker::Hipster.sentence(2, true, 1),
        body: Faker::Hacker.say_something_smart)
review10 = Review.create!(user_id: user2.id,
        game_id: game4.id, score: 5,
        title: Faker::Hipster.sentence(2, true, 1),
        body: Faker::Hacker.say_something_smart)

# Creates data to help new users to the site
review11 = Review.create!(user_id: user2.id,
  game_id: game1.id, score: 1,
  title: "Check out what I've reviewed!",
  body: "To the left of this review box, you can see my user image. If you click it, it will bring you to my user page and you can view all of my reviews and ratings")
review12 = Review.create!(user_id: user3.id,
  game_id: game1.id, score: 2,
  title: "Can I see all the users or games?",
  body: "You definitely can. Click the 'Browse' button to check out all the games and click 'Community' button to see all current members of ggg")
review13 = Review.create!(user_id: user4.id,
  game_id: game1.id, score: 3,
  title: "Search Bar",
  body: "In the navigation bar, there is a search bar that will allow you to search our database for users or games that contain your query. Try typing 'sup' and see what pops up!")
review14 = Review.create!(user_id: user5.id,
  game_id: game1.id, score: 4,
  title: "Add your own review to a game!",
  body: "Let's make your first review! Click the 'Add your own review!' button. After filling it out, you'll see it pop up as the most recent review! Keep doing that and let everyone know how you feel about games!")
review15 = Review.create!(user_id: user6.id,
  game_id: game1.id, score: 5,
  title: "Who made this...?",
  body: "If you're interested in who created this website, take a look at the creator navigation at the bottom of any page. Thanks for stopping by!")

# Creates other reviews
        User.all.slice(1..-1).each do |user|
          Game.all.slice(4..-1).each do |game|
            Review.create!(user_id: user.id,
            game_id: game.id,
            score: rand(5)+1,
            title: Faker::Hipster.sentence(2, true, 1),
            body: Faker::Hacker.say_something_smart)
          end
        end
