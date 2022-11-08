class CardsController < ApplicationController
  before_action :set_card, only: %i[ show update destroy ]
  # skip_before_action :authorize

  # GET /cards
  def index
    @cards = Card.all

    render json: @cards
  end

  # GET /cards/1
  def show
    render json: @card
  end

  def get_random_subset
    collection = Collection.find_by(local_url: params[:local_url])
    render json: collection.cards.order("RAND()").limit(params[:deck_size])
  end


  # POST /cards
  def create
    @card = Card.new(card_params)

    if @card.save
      render json: @card, status: :created, location: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cards/1
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def card_params
      params.require(:card).permit(:user_id, :collection_id, :name, :type, :file_name, :rarity, :card_asset, :card_art)
    end
end
