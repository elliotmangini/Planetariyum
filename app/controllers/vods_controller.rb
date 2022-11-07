class VodsController < ApplicationController
  before_action :set_vod, only: %i[ show update destroy ]

  # GET /vods
  def index
    @vods = Vod.all

    render json: @vods
  end

  # GET /vods/1
  def show
    render json: @vod
  end

  # POST /vods
  def create
    @vod = Vod.new(vod_params)

    if @vod.save
      render json: @vod, status: :created, location: @vod
    else
      render json: @vod.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vods/1
  def update
    if @vod.update(vod_params)
      render json: @vod
    else
      render json: @vod.errors, status: :unprocessable_entity
    end
  end

  # DELETE /vods/1
  def destroy
    @vod.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vod
      @vod = Vod.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def vod_params
      params.require(:vod).permit(:user_id, :game_id)
    end
end
