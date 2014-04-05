class AddListIdToMatters < ActiveRecord::Migration
  def change
    add_column :matters, :list_id, :integer
  end
end
