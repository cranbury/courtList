class MattersController < ApplicationController

  def index
    @matters = Matter.where({list_id: params[:list_id]})
    render json: @matters
  end

  def show
    @matter = Matter.find(params[:id])
  end

  def update
    @matter = Matter.find(params[:id])
    @matter.update(matter_params)
    render json:@matter
  end

  private
  def matter_params
    params.permit(:disposition, :done)
  end

end