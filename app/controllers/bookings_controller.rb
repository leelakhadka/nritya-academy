class BookingsController < ApplicationController

    def index
        booking = Booking.all
        render json: booking, status: :ok
    end

    def show 
        booking = Booking.find(params[:id])
        render json: booking, status: :ok
    end

    def create
        fee = params[:fee].to_i
        paid = false
    
        if fee == 10 
          paid = true
        end

        @booking = Booking.create!(      
            fee: fee,
            paid: paid,
            user_id: params[:user_id],
            dance_class_id: params[:dance_class_id])
        render json: @booking, status: :created
    end

    def update
        fee = params[:fee].to_i
        paid = false
    
        if fee == 10 
          paid = true
        end
        
        @booking = Booking.find(params[:id])
        @booking.update!(
            fee: fee,
            paid: paid
        )
        render json: @booking, status: :ok
    end

    def destroy
        @booking = Booking.find(params[:id])
        @booking.destroy
        head :no_content
    end

    private
    def booking_params
        params.permit(:fee, :paid, :user_id, :dance_class_id)
    end
end
