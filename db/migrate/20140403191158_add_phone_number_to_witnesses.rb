class AddPhoneNumberToWitnesses < ActiveRecord::Migration
  def change
    add_column :witnesses, :phone_number, :string
  end
end
