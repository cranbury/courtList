class CreateWitnesses < ActiveRecord::Migration
  def change
    create_table :witnesses do |t|
      t.string :name
      t.boolean :officer

      t.references :matter

      t.timestamps
    end
  end
end
