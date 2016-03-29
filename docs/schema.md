# Schema Information

## comments
column name  | data type  | details
-------------|------------|-----------------------
id           | integer    | not null, primary key
body         | text       | not null
gameshelf_id | integer    | not null, foreign key
commenter_id | integer    | not null, foreign key
timestamps   | timestamps | not null

## games
column name  | data type  | details
-------------|------------|-----------------------
id           | integer    | not null, primary key
title        | string     | not null
description  | text       | not null
release_date | date       | not null
author_id    | integer    | not null, foreign key
gameshelf_id | integer    | not null, foreign key, indexed
wishlist_id  | integer    | not null, foreign key, indexed
timestamps   | timestamps | not null

## gameshelves
column name | data type  | details
------------|------------|-----------------------
id          | integer    | not null, primary key
owner_id    | integer    | not null, foreign key
title       | string     | not null
timestamps  | timestamps | not null

## ratings
column name | data type  | details
------------|------------|-----------------------
id          | integer    | not null, primary key
game_id     | integer    | not null, foreign key
user_id     | integer    | not null, foreign key
rating      | integer    | not null
timestamps  | timestamps | not null

## reviews
column name | data type  | details
------------|------------|-----------------------
id          | integer    | not null, primary key
user_id     | integer    | not null, foreign key
game_id     | integer    | not null, foreign key
date        | datetime   | not null
type        | string     | not null
timestamps  | timestamps | not null

## users
column name     | data type  | details
----------------|------------|-----------------------
id              | integer    | not null, primary key
username        | string     | not null, indexed, unique
password_digest | string     | not null
session_token   | string     | not null, indexed, unique
timestamps      | timestamps | not null


## wishlist
column name  | data type  | details
-------------|------------|-----------------------
id           | integer    | not null, primary key
title        | string     | not null
user_id      | integer    | not null, foreign key
timestamps   | timestamps | not null


Database To-Dos:
- [ ] Implement constraint that a user can only review a game once
- [ ] Users cannot add multiples of the same game to a single gameshelf
  - But they are allowed to add the same game to different gameshelves
- [ ] Need to check for polymorphic associations!!!
