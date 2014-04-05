require "spec_helper"

describe DefendantMatter do
  it { should belong_to(:matter) }
  it { should belong_to(:defendant) }
  it { should belong_to(:attorney) }

end