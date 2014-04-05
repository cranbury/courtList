class DefendantMatter < ActiveRecord::Base
  belongs_to :matter
  belongs_to :defendant
  belongs_to :attorney
end