class CreateMatters < ActiveRecord::Migration
  def change
    create_table :matters do |t|
      t.string :docket_number
      t.time :update_at

      t.timestamps
    end
  end
end
