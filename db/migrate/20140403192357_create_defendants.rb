class CreateDefendants < ActiveRecord::Migration
  def change
    create_table :defendants do |t|
      t.string :name
      t.boolean :in_custody
      t.string :prisoner_number
      t.string :email
      t.string :phone_number

      t.timestamps
    end
  end
end
