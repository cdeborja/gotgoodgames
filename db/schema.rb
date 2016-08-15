# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160815165909) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string   "title",              null: false
    t.text     "description",        null: false
    t.date     "release_date",       null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "console"
    t.string   "cover_file_name"
    t.string   "cover_content_type"
    t.integer  "cover_file_size"
    t.datetime "cover_updated_at"
    t.string   "image_url"
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "review_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "likes", ["user_id", "review_id"], name: "index_likes_on_user_id_and_review_id", unique: true, using: :btree

  create_table "pg_search_documents", force: :cascade do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "pg_search_documents", ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.text     "body"
    t.integer  "user_id",    null: false
    t.integer  "game_id",    null: false
    t.integer  "score",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",             null: false
    t.string   "password_digest",      null: false
    t.string   "session_token",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "title"
    t.text     "description"
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
