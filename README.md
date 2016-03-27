# GotGoodGame

Are you a gamer? Do you consider yourself a <i>connoisseur</i> of video games?

Do you... got good game?

This is a github repository outlining the creation and implementation of
'gotgoodgame', a website akin to the currently running www.goodreads.com,
but instead will be more focused on video games instead of books. It is built
using Ruby on Rails and React js.

## Heroku Link
[Heroku link][heroku] **NB** This will link to the actual website once available
[heroku]: www.herokuapp.com

## Minimum Viable Product
Similar to goodreads, gotgoodgame will allow users to:

Short term goals:
- [ ] Create an account
- [ ] Log in / log out
- [ ] Create a review and give a rating of games they have played
- [ ] Organize multiple gameshelves by genre, console, etc
- [ ] Organize a wish list of games they want to play
- [ ] Search for games from a large database of games
- [ ] View other user's gameshelves
- [ ] Comment on another user's shelves

Longterm goals:
- [ ] Connectivity with facebook
- [ ] Users can either link their twitch accounts or upload gameplay videos
- [ ] Community Trivia
- [ ] A separate section that users can also write easter eggs for their favorite games
- [ ] More in-depth details of games (maybe links to something akin to IMDB)

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [DB Schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] redirect to blank homepage after signin

### Phase 2: Game Model, API, and basic APIUtil (1.5 days)

**Objective:** Reviews can be created, read, edited and destroyed through
the API on a Game.

- [ ] create `Game` model
- [ ] create `Review` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for reviews (`ReviewsController`)
- [ ] jBuilder views for reviews
- [ ] setup Webpack
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days)

**Objective:** Reviews can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop
- [ ] setup React Router
- implement each review component, building out the flux loop as needed.
  - [ ] `Rating`
  - [ ] `Review`

### Phase 4: Start Styling (0.5 days)

**Objective:** Existing pages (including singup/signin) will look okay.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Notebooks (1 day)

**Objective:** Reviews belong to Games, and can be viewed by in a Gameshelf.

- [ ] create `Gameshelf` model
- build out API, Flux loop, and components for:
  - [ ] Gameshelf CRUD
  - [ ] adding notes requires a notebook
  - [ ] moving notes to a different notebook
  - [ ] viewing notes by notebook
- Use CSS to style new views

Phase 3 adds organization to the Notes. Notes belong to a Gameshelf,
which has its own `Index` view.

### Phase 6: Tags (1.5 days)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for notebook
  - [ ] adding tags to notebook
  - [ ] creating tags while adding to notebooks
  - [ ] searching notebooks by tag
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Notes (0.5 days)

**objective:** Enable complex styling of notes.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 8: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.
