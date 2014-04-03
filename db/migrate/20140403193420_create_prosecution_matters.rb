class CreateProsecutionMatters < ActiveRecord::Migration
  def change
    create_table :prosecution_matters do |t|
      t.references :matter
      t.references :attorney
    end
  end
end
