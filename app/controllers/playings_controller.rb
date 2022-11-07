class PlayingsController < ApplicationController
  before_action :set_playing, only: %i[ show update destroy ]

  # GET /playings
  def index
    @playings = Playing.all

    render json: @playings
  end

  # GET /playings/1
  def show
    render json: @playing
  end

  # POST /playings
  def create
    @playing = Playing.new(playing_params)

    if @playing.save
      render json: @playing, status: :created, location: @playing
    else
      render json: @playing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /playings/1
  def update
    if @playing.update(playing_params)
      render json: @playing
    else
      render json: @playing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /playings/1
  def destroy
    @playing.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_playing
      @playing = Playing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def playing_params
      params.require(:playing).permit(:game_id, :user_id)
    end
end
