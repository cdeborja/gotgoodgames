# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## gameshelves
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key
title       | string    | not null


## comments
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
comments     | text      | not null
gameshelf_id | integer   | not null, foreign key
commenter_id | integer   | not null, foreign key

## games
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null
description  | text      | not null
release_date | date      | not null
author_id    | integer   | not null, foreign key
gameshelf_id | integer   | not null, foreign key
wishlist_id  | integer   | not null, foreign key

## wishlist
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
title        | string    | not null
user_id      | integer   | not null, foreign key

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key
game_id     | integer   | not null, foreign key
date        | datetime  | not null
type        | string    | not null

## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
game_id     | integer   | not null, foreign key
user_id     | integer   | not null, foreign key
rating      | integer   | not null


Database To-Dos:
- [ ] Implement constraint that a user can only review a game once
- [ ] Users cannot add multiples of the same game to their gameshelf
- [ ] Need to check for polymorphic associations!!!
