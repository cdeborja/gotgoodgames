# GotGoodGame

Are you a gamer? Do you consider yourself a **connoisseur** of video games?

Do you... got good game?

This is a github repository outlining the creation and implementation of
'gotgoodgame', a website akin to the currently running www.goodreads.com,
but instead will be more focused on video games instead of books. It is built
using Ruby on Rails and React js.

## Heroku Link
[Heroku link][heroku] **NB** This links to a domain redirected from Heroku
[heroku]: www.gotgoodgames.xyz

## Design Docs
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

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] redirect to blank homepage after signin

### Phase 2: Game Model, API, and basic APIUtil (1 day)

**Objective:** Game model that can be created, read, edited and destroyed through
the API (by an Admin User)

- [ ] create `Game` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for reviews (`GamesController`)
- [ ] jBuilder views for `Game`s?
- [ ] setup Webpack
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Review Model and interaction with Game Model (1 day)

**Objective:** Review model that can be created, read, edited, and destroyed through API for a game

- [ ] create `Review` model
  - Do `Rating` need their own model or are they a part of `Review` model?
- [ ] seed the database with a small amount of review test data
- [ ] CRUD API for reviews (`ReviewsController`)
- [ ] jBuilder views for `Review`s
- [ ] test out API interaction in the console.

### Phase 4: Gameshelf Model and interaction with Game Model (0.5 days)

**Objective:** Gameshelf model that can be created, read, edited, and destroyed through API for a user's page with games

- [ ] create `Gameshelf` model
- [ ] seed database with games from the `Game` model
- [ ] CRUD API for gameshelf (`GameshelvesController`)

### Phase 5: User Model and interaction with Game, Gameshelf, and Review Models (0.5 days)

**Objective:** Create a User Page that will display a user's profile information, recently reviewed games, gameshelves, and comments by other users

- [ ] revisit `User` model and update to have information for webpage display
- [ ] figure out how to display a user's most recent review to their webpage

### Phase 6: Flux Architecture and Router (2 days)

**Objective:** Solidify flux connections, such that users can CRUD easily for Gameshelves, Wishlists, and Reviews (admins can access Game model)

- [ ] setup the flux loop
- [ ] setup React Router
- [ ] setup search bar

### Phase 7: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look okay.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 8: Newsfeed to be displayed on homepage (1 day)

**objective:** Enable other users' activity to be displayed on user's homepage.

- [ ] Integrate AJAX approach of twitter, but only displaying other user's activity.

### Phase 9: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.
