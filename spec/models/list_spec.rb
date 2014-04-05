require "spec_helper"

describe List do
  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:start_time) }
  it { should validate_presence_of(:room) }
  it { should validate_presence_of(:in_session) }
  it { should have_many(:matters) }

end