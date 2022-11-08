class CollectionsController < ApplicationController
  before_action :set_collection, only: %i[ show update destroy ]
  skip_before_action :authorize, only: [:index]

  # GET /collections
  def index
    @collections = Collection.all
    render json: @collections
  end

  # GET /collections/1
  def show
    render json: @collection
  end

  # GET /collections/:local_url
  def find_by_local_url
    collection = Collection.find_by(local_url: params[:local_url])
    render json: collection
  end

  # POST /collections
  def create
    @collection = Collection.new(collection_params)

    if @collection.save
      render json: @collection, status: :created, location: @collection
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /collections/1
  def update
    if @collection.update(collection_params)
      render json: @collection
    else
      render json: @collection.errors, status: :unprocessable_entity
    end
  end

  # DELETE /collections/1
  def destroy
    @collection.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_collection
      @collection = Collection.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def collection_params
      params.require(:collection).permit(:name, :user_id, :description, :embed_url, :featured_content)
    end
end
