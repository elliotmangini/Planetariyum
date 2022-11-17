class NftsController < ApplicationController
  before_action :set_nft, only: %i[ show update destroy claim_nft welcome_claim_nft]
  before_action :set_game, only: %i[ claim_nft welcome_claim_nft]

  # GET /nfts/1
  def show
    render json: @nft
  end

  def start_game
    game = Game.find_by(local_url: params[:local_url])

    players = User.find(params[:staged_players].split(','));
    players.each do |p|
      playing = game.playings.create(player_id: p.id)
    end

    card_subset = game.collection.cards.order(Arel.sql('RANDOM()')).limit(game.deck_size * players.length)

    card_subset.each do |c|
      newNft = game.nfts.create(card_id: c.id, holder_id: User.find_by(username: "planetariyumwallet").id)
    end

    # GET BACK INFORMATION ABOUT WHAT CARDS ARE IN WHAT PACKS

    render json: game, include: ['players', 'collection', 'nfts', 'nfts.owner', 'nfts.holder', 'nfts.card'],  status: :created
  end


  def create_welcome_game
    game = Game.find_by(local_url: params[:local_url])

    players = User.find(params[:staged_players].split(','));
    players.each do |p|
      playing = game.playings.create(player_id: p.id)
    end

    card_subset = game.collection.cards.limit(game.deck_size * players.length)

    card_subset.each do |c|
      newNft = game.nfts.create(card_id: c.id, holder_id: User.find_by(username: "planetariyumwallet").id)
    end
    # GET BACK INFORMATION ABOUT WHAT CARDS ARE IN WHAT PACKS

    render json: game, include: ['players', 'collection', 'nfts', 'nfts.owner', 'nfts.holder', 'nfts.card'],  status: :created
  end

  def claim_nft
    # byebug
    @nft.update_attribute(:owner_id, params[:owner_id])
    # @game.update_attribute(:deck_size, @game.nfts.find_by(:owner_id === null).count)
    render json: @game, include: ['players', 'collection', 'nfts', 'nfts.owner', 'nfts.holder', 'nfts.card'],  status: :accepted
  end

  def welcome_claim_nft
    # byebug
    @nft.update_attribute(:owner_id, params[:owner_id])
    sophie_nft = Nft.find(params[:sophie_pick_id]).update_attribute(:owner_id, 2)
    # @game.update_attribute(:deck_size, @game.nfts.find_by(:owner_id === null).count)
    render json: @game, include: ['players', 'collection', 'nfts', 'nfts.owner', 'nfts.holder', 'nfts.card'],  status: :accepted
  end
  
  # GET /nfts
  def index
    @nfts = Nft.all
  
    render json: @nfts
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nft
      @nft = Nft.find(params[:id])
    end

    def set_game
      @game = Nft.find(params[:id]).game
    end

    # Only allow a list of trusted parameters through.
    def nft_params
      params.require(:nft).permit(:edition, :scan_digest, :address, :card_id, :game_id, :user_id)
    end
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