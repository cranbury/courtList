require "spec_helper"

describe ProsecutionMatter do
  it { should belong_to(:attorney) }
  it { should belong_to(:matter) }
 
end