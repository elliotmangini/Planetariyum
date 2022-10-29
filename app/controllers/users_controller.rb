class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]

    def index
        render json: User.all, include: ['projects', 'projects.awards', 'projects.languages']
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, include: ['projects', 'projects.awards', 'projects.languages']
    end

    private

    def user_params
        params.permit(:username, :bio, :email, :default_timezone, :twitch_username, :password, :password_confirmation)
    end

end
