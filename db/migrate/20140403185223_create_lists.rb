class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.date :date
      t.time :start_time
      t.string :room
      t.boolean :in_session
      t.time :back_at

      t.timestamps
    end
  end
end
