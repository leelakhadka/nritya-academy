class UsersController < ApplicationController
    skip_before_action :authorize_user, only: [:index, :show, :create, :update]

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        render json: current_user, serializer: UserWithBookingsSerializer, include: ['bookings', 'bookings.dance_class'], status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end 

    def update
        user = current_user.update!(user_params)
        render json: current_user, status: :ok
    end


    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :admin)
    end
end
