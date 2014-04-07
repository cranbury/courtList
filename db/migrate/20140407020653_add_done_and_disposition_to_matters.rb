class AddDoneAndDispositionToMatters < ActiveRecord::Migration
  def change
    add_column :matters, :done, :boolean
    add_column :matters, :disposition, :text
  end
end
