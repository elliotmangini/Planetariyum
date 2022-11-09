class NftsController < ApplicationController
  before_action :set_nft, only: %i[ show update destroy ]

  # # GET /nfts
  # def index
  #   @nfts = Nft.all

  #   render json: @nfts
  # end

  # GET /nfts/1
  def show
    render json: @nft
  end

  # # POST /nfts
  # def create
  #   @nft = Nft.new(nft_params)

  #   if @nft.save
  #     render json: @nft, status: :created, location: @nft
  #   else
  #     render json: @nft.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /nfts/1
  # def update
  #   if @nft.update(nft_params)
  #     render json: @nft
  #   else
  #     render json: @nft.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /nfts/1
  # def destroy
  #   @nft.destroy
  # end

  def start_game
    game = Game.find_by(local_url: params[:local_url])
    card_subset = game.collection.cards.order(Arel.sql('RANDOM()')).limit(game.deck_size)

    players = User.find(params[:staged_players].split(','));
    players.each do |p|
      game.playings.create!(player_id: p.id)

      card_subset.each do |c|
        newNft = game.nfts.create!(card_id: c.id, game_id: game.id, owner_id: p.id, holder_id: User.find_by(username: "planetariyumwallet").id)
      end
    end

    render json: game, include: ['nfts', 'nfts.owner', 'nfts.holder'],  status: :created
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
