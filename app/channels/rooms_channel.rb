class RoomsChannel < ApplicationCable::Channel
    def subscribed
      stop_all_streams
      @game = Game.find_by(:local_url => params[:room_url])
      @room = Game.room
      stream_for @room
    end
  
    # You can add a received function here,
    # but I dont know what it does
  
    def unsubscribed
      stop_all_streams
    end
  end