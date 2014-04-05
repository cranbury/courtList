class AddJudgeIdToLists < ActiveRecord::Migration
  def change
    add_column :lists, :judge_id, :string
  end
end
