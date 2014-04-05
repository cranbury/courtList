require "spec_helper"

describe Judge do
  it { should validate_presence_of(:name) }
  it { should have_many(:lists) }
 
end