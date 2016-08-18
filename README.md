#gotgoodgames

Are you a gamer? Do you consider yourself a **connoisseur** of video games?

Do you [gotgoodgames](http://www.gotgoodgames.xyz/)?

This is a github repository outlining the creation and implementation of
'gotgoodgames', a website that is focused on reviewing and rating video games.
It is built with a Ruby on Rails backend and a React.js frontend.

##Design Docs
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

###Welcome View
![welcome]

###Landing Page
![landingPage]

###Current Features
* Can create users with personalized username
* Can sign up and sign in using either Facebook or Twitch account
* Users can give a rating and a review to games of their choice
* Users can modify or delete previous reviews and score
* Users can like other user reviews
* Search bar enabled to search for Users or Games

###Future Features
* Use kaminari gem for pagination to reduce client side time
* Create a 'favorite gameshelf' that will allow users favorite gameshelf
  and allow to drag and drop for reorganization

[welcome]: ./docs/images/welcome.png
[landingPage]: ./docs/images/landing_page.png
