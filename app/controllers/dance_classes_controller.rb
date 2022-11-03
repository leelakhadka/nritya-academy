class DanceClassesController < ApplicationController

    def index
        booking = DanceClass.all
        render json: booking, status: :ok
    end

    def show 
        booking = DanceClass.find(params[:id])
        render json: booking, status: :ok
    end

    def create
        @booking = DanceClass.create!(dance_class_params)
        render json: @booking, status: :created
    end

    def update
        @booking = DanceClass.find(params[:id])
        @booking.update!(dance_class_params)
        render json: @booking, status: :ok
    end

    def destroy
        @booking = DanceClass.find(params[:id])
        @booking.destroy
        render json: {}, status: :no_content
    end

    private
    def dance_class_params
        params.permit(:category, :location, :date, :start_time, :duration, :image)
    end

end
