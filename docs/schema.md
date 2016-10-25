# Schema Information

## games
column name       | data type  | details
------------------|------------|-----------------------
id                | integer    | not null, primary key
title             | string     | not null
description       | text       | not null
release_date      | date       | not null
timestamps        | timestamps | not null
console           | string     |
cover_file_name   | string     |
cover_content_type| string     |
cover_file_size   | integer    |
image_url         | string     |

## likes
column name  | data type  | details
-------------|------------|----------
id           | integer    | not null
user_id      | integer    | not null
review_id    | integer    | not null

add_index "likes", ["user_id", "review_id"]

## pg_search_documents
column name       | data type  
------------------|------------
id                | integer    
content           | text       
searchable_id     | integer    
searchable_type   | string     


## reviews
column name | data type  | details
------------|------------|-----------------------
id          | integer    | not null, primary key
user_id     | integer    | not null, foreign key
game_id     | integer    | not null, foreign key
score       | integer    | not null
body        | text       |
title       | string     |

## users
column name           | data type  | details
----------------------|------------|-----------------------
id                    | integer    | not null, primary key
username              | string     | not null, indexed, unique
password_digest       | string     | not null
session_token         | string     | not null, indexed, unique
picture_file_name     | string     |
picture_content_type  | string     |
picture_file_size     | integer    |
title                 | string     |
description           | text       |
uid                   | string     |
provider              | string     |

add_index "users", ["username"]
