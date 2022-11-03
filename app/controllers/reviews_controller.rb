class ReviewsController < ApplicationController

    def index
        booking = Review.all
        render json: booking, status: :ok
    end

    def show 
        booking = Review.find(params[:id])
        render json: booking, status: :ok
    end

    def create
        @booking = Review.create!(review_params)
        render json: @booking, status: :created
    end

    def update
        @booking = Review.find(params[:id])
        @booking.update!(review_params)
        render json: @booking, status: :ok
    end

    def destroy
        @booking = Review.find(params[:id])
        @booking.destroy
        render json: {}, status: :no_content
    end

    private
    def review_params
        params.permit(:comment, :rating, :user_id, :dance_class_id)
    end

end
