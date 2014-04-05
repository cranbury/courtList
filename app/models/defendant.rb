class Defendant < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :in_custody
  validates_presence_of :prisoner_number

  has_many :defendant_matters
  has_many :attorneys, through: :defendant_matters
end
