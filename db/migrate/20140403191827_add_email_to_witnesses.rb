class AddEmailToWitnesses < ActiveRecord::Migration
  def change
    add_column :witnesses, :email, :string
  end
end
