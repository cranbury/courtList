class Witness < ActiveRecord::Base
  validates_presence_of :name
  belongs_to :matter
end
