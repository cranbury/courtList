class AddNumberOnList < ActiveRecord::Migration
  def change
    add_column :matters, :number_on_list, :integer
  end
end
