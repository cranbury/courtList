class WelcomeController < ApplicationController

  def index
    @lists = List.all
  end

end