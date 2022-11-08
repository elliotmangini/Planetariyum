class NftsController < ApplicationController
  before_action :set_nft, only: %i[ show update destroy ]

  # GET /nfts
  def index
    @nfts = Nft.all

    render json: @nfts
  end

  # GET /nfts/1
  def show
    render json: @nft
  end

  # POST /nfts
  def create
    @nft = Nft.new(nft_params)

    if @nft.save
      render json: @nft, status: :created, location: @nft
    else
      render json: @nft.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /nfts/1
  def update
    if @nft.update(nft_params)
      render json: @nft
    else
      render json: @nft.errors, status: :unprocessable_entity
    end
  end

  # DELETE /nfts/1
  def destroy
    @nft.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nft
      @nft = Nft.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def nft_params
      params.require(:nft).permit(:edition, :scan_digest, :address, :card_id, :game_id, :user_id)
    end
end
