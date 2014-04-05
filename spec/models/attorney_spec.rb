require "spec_helper"

describe Attorney do
  it { should validate_presence_of(:name) }
  it { should have_many(:prosecution_matters) }
  it { should have_many(:defendant_matters) }


end