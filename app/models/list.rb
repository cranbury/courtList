class List < ActiveRecord::Base
  validates_presence_of :date
  validates_presence_of :start_time
  validates_presence_of :room
  validates_presence_of :in_session

  has_many :matters

end
