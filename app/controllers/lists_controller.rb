class ListsController < ApplicationController

  def index
    render json: List.all
  end

  def show
    @list = List.find(params[:id])
  end


end

