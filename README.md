#GotGoodGames

Are you a gamer? Do you consider yourself a **connoisseur** of video games?

Do you... got good games?

This is a github repository outlining the creation and implementation of
'gotgoodgames', a website akin to the currently running www.goodreads.com,
but instead will be more focused on video games instead of books. It is built
using Ruby on Rails and React js.

##Heroku Link
[gotgoodgames](http://www.gotgoodgames.xyz/)
**NB** This links to a domain redirected from Heroku

##Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

###Welcome View
![welcome]

###Landing Page
![landingPage]

###Technical Details
COMING SOON

###Current Features
* Can Sign Up New Users
* Users can give a rating and a review to games of their choice
* Users can modify or delete previous reviews
* Search bar enabled to search for Users or Games

###Future Features
* Can sign up using either Facebook or Twitch account
* Upon clicking `Browse` can navigate through database of Games
* Upon clicking `Community` can navigate through all users in the system
* Able to follow other users and see their recent activity in updates (on left side of landing page)
* Participate in discussions of games (ie, if anyone currently playing a game needs advice or help)
* Users can upvote (or downvote) other reviews

###To-Do:
* [ ] Fix search bar
* [ ] Fix edit profile buttons
* [ ] Fix layout based off of notes
* [ ] Create upvote/downvote system
* [ ] Seed more data
* [ ] Update landing page (with other database sliders)
* [ ] Create following system (which leads to displaying updates in update feed)

[welcome]: ./docs/images/welcome.png
[landingPage]: ./docs/images/landing_page.png
