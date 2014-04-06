class MattersController < ApplicationController

  def index
    @matters = Matter.where({id: params[:list_id]})
    render json: @matters
  end

  def show
    @matter = Matter.find(params[:id])
  end


end