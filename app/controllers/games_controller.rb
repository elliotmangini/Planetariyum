class GamesController < ApplicationController
  before_action :set_game, only: %i[ show update destroy ]

  # GET /games
  def index
    @games = Game.all

    render json: @games
  end

  # GET /games/1
  def show
    render json: @game
  end

  def get_live_game
    puts "getting live game"
    puts params
    game = Game.find_by(local_url: params[:local_url])
    render json: game, include: ['room', 'players', 'collection', 'nfts', 'nfts.owner', 'nfts.holder', 'nfts.card']
  end

  # POST /games
  def create
    puts "creating game"
    puts params
    @game = Game.create!(game_params)
    @game.create_room()
    render json: @game, include: ['room', 'players', 'collection', 'nfts', 'nfts.owner', 'nfts.holder', 'nfts.card'], status: :created
  end

  # PATCH/PUT /games/1
  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:deck_size, :deadline, :local_url, :game_type, :collection_id)
    end
end
