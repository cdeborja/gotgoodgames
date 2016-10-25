#gotgoodgames

Are you a gamer? Do you consider yourself a **connoisseur** of video games?

Do you [gotgoodgames](http://www.gotgoodgames.xyz/)?

Outline of the creation and implementation of 'gotgoodgames', a website that is focused on reviewing and rating video games.
It is built with a Ruby on Rails backend and a React.js frontend.

##Design Docs
* [React Components][components]
* [DB schema][schema]

[components]: ./docs/components.md
[schema]: ./docs/schema.md

###Welcome View
![welcome]

###Landing Page
![landingPage]


### Pagination and Infinite Scrolling
In main app page, the variables are instantiated:
```javascript
var gamePage = 1;
var reviewsPage = 1;
```

The function `isBottom` is used to detect when the user has scrolled to the bottom of the page, which also indicates that all visible reviews and games are seen. Therefore when invoked, the function retrieves additional data if there is any.
```javascript
isBottom: function () {
  $(window).scroll(function () {
    if($(window).scrollTop() + $(window).height() == $(document).height() && this.location.hash.includes("/gamesIndex")) {
      ApiUtil.fetchAllGames(gamePage + 1);
      gamePage ++;
    } else if ($(window).scrollTop() + $(window).height() == $(document).height() && this.location.hash.includes("/users/")) {
      var start = this.location.hash.indexOf("s/") + 2;
      var end = this.location.hash.indexOf("?");
      var userId = this.location.hash.slice(start,end);
      ApiUtil.fetchUserReviews(userId, reviewsPage + 1);
      reviewsPage ++;
    }

    if (!this.location.hash.includes("/gamesIndex")) {
      gamePage = 1;
    }

    if (!this.location.hash.includes("/users/")) {
      reviewsPage = 1;
    }
  });
},
```
###Current Features
* Can create users with personalized username
* Can sign up and sign in using either Facebook or Twitch account
* Users can give a rating and a review to games of their choice
* Users can modify or delete previous reviews and score
* Users can like other user reviews
* Search bar enabled to search for Users or Games
* Implemented infinite scrolling for games index in order to prevent client side lagging issues with a larger game database, more games are fetched when user scrolls down to the bottom

###Future Features
* Create a 'favorite gameshelf' that will allow users favorite gameshelf
  and allow to drag and drop for reorganization of games in their own user page
* Utilize 3rd party API for game data instead of using seeds

[welcome]: ./docs/images/welcome.png
[landingPage]: ./docs/images/landing_page.png
