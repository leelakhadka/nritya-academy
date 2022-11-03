class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        booking = User.find(params[:id])
        render json: booking, status: :ok
    end


    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end 


    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password)
    end
end
