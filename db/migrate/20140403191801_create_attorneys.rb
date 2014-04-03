class CreateAttorneys < ActiveRecord::Migration
  def change
    create_table :attorneys do |t|
      t.string :name
      t.string :phone_number
      t.string :email
      t.string :firm

      t.timestamps
    end
  end
end
