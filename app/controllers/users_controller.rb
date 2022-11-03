class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def set_avatar
        @current_user.update_attribute(:avatar, params[:avatar])
        render json: @current_user, status: :accepted
    end

    def show
        render json: @current_user
    end

    private

    def user_params
        params.permit(:username, :avatar, :bio, :email, :site_theme, :custom_theme, :default_timezone, :twitch_username, :password, :password_confirmation)
    end

end
