class RoomsChannel < ApplicationCable::Channel
    def subscribed
      stop_all_streams
      thing = Room.find(params[:thing_id])
      stream_for room
    end
  
    # You can add a received function here,
    # but I dont know what it does
  
    def unsubscribed
      stop_all_streams
    end
  end