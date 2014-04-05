class Matter < ActiveRecord::Base
  validates_presence_of :docket_number

  has_many :prosecution_matters
  has_many :defendant_matters
  has_many :witnesses
  belongs_to :list
end
