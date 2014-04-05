class ProsecutionMatter < ActiveRecord::Base
  belongs_to :matter
  belongs_to :attorney
end