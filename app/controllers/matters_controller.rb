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

  def create
    @matter = Matter.create(matter_params)
    @matter.update(list_id: params[:list_id])
    render json: @matter
  end

  def destroy
    @matter = Matter.find(params[:id])
    @matter.destroy
    render json: Matter.all
  end

  private
  def matter_params
    params.permit(:disposition, :done, :docket_number, :number_on_list)
  end

end