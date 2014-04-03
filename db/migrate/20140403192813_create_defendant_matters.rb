class CreateDefendantMatters < ActiveRecord::Migration
  def change
    create_table :defendant_matters do |t|
      t.references :matter
      t.references :defendant
      t.references :attorney
    end
  end
end
