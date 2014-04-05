class Attorney < ActiveRecord::Base
  validates_presence_of :name

  has_many :defendant_matters
  has_many :prosecution_matters
end
