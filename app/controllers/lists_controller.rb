class ListsController < WebsocketRails::BaseController


  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def new_message
  end
  
end
