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

ActiveRecord::Schema.define(version: 20140403193420) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attorneys", force: true do |t|
    t.string   "name"
    t.string   "phone_number"
    t.string   "email"
    t.string   "firm"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "defendant_matters", force: true do |t|
    t.integer "matter_id"
    t.integer "defendant_id"
    t.integer "attorney_id"
  end

  create_table "defendants", force: true do |t|
    t.string   "name"
    t.boolean  "in_custody"
    t.string   "prisoner_number"
    t.string   "email"
    t.string   "phone_number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "judges", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "lists", force: true do |t|
    t.date     "date"
    t.time     "start_time"
    t.string   "room"
    t.boolean  "in_session"
    t.time     "back_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "matters", force: true do |t|
    t.string   "docket_number"
    t.time     "update_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "prosecution_matters", force: true do |t|
    t.integer "matter_id"
    t.integer "attorney_id"
  end

  create_table "witnesses", force: true do |t|
    t.string   "name"
    t.boolean  "officer"
    t.integer  "matter_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "phone_number"
    t.string   "email"
  end

end
