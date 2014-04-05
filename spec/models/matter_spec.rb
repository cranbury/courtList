require "spec_helper"

describe Matter do
  it { should validate_presence_of(:docket_number) }
  it { should have_many(:prosecution_matters) }
  it { should have_many(:defendant_matters) }
  it { should have_many(:witnesses) }
  it { should belong_to(:list) }

end