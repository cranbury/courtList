require "spec_helper"

describe Witness do
  it { should validate_presence_of(:name) }
  it { should belong_to(:matter) }
  
end