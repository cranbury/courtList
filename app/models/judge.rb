class Judge < ActiveRecord::Base
  validates_presence_of :name

  has_many :lists
end
