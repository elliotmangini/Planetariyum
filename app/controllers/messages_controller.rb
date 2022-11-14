class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy ]

  # # GET /messages
  # def index
  #   @messages = Message.all

  #   render json: @messages
  # end

  # # GET /messages/1
  # def show
  #   render json: @message
  # end
  
  # POST /messages
  def create
    room = room.find(params(:room_id))

    @message = Message.new(message_params)
    @message.user = @current_user
    @message.room = room
    @message.save!

    broadcast room

    render json: message, status: :created

    # # after successfully creating the message, tell the room to add it
    # RoomsChannel.broadcast_to(room, { new_message: message })


    # if @message.save
    #   render json: @message, status: :created, location: @message
    # else
    #   render json: @message.errors, status: :unprocessable_entity
    # end
  end
  
    # # PATCH/PUT /messages/1
    # def update
    #   if @message.update(message_params)
    #     render json: @message
    #   else
    #     render json: @message.errors, status: :unprocessable_entity
    #   end
    # end
  
    # # DELETE /messages/1
    # def destroy
    #   @message.destroy
    # end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body, :user_id, :room_id)
    end

    def broadcast(room)
      # ActiveModelSerializers::SerializableResource.new(object).as_json
      # returns the same thing sent by render json: object
      RoomsChannel.broadcast_to(room, ActiveModelSerializers::SerializableResource.new(room).as_json)
    end
end
