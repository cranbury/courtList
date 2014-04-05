require "spec_helper"

describe Defendant do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:in_custody) }
  it { should validate_presence_of(:prisoner_number) }
  it { should have_many(:defendant_matters) }
  it { should have_many(:attorneys).through(:defendant_matters) }

end