class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :get]

    def create
        user = User.create!(user_params)
        # user.update_attribute(:display_name, user.username)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def set_avatar
        @current_user.update_attribute(:avatar, params[:avatar])
        render json: @current_user, status: :accepted
    end

    def show
        # puts "AUTOLOGIN FIRING IN THE USER CONTROLLER"
        render json: @current_user
    end

    def get
        user = User.find_by(username: params[:username])
        render json: user
    end

    private

    def user_params
        params.permit(:username, :display_name, :avatar, :bio, :email, :site_theme, :custom_theme, :default_timezone, :twitch_username, :password, :password_confirmation)
    end

end
