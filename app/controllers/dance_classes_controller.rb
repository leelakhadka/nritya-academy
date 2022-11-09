class DanceClassesController < ApplicationController

    skip_before_action :authorize_user, only: [:index]

    def index
        danceClasses = DanceClass.all
        render json: danceClasses, status: :ok
    end

    def show 
        danceClass = DanceClass.find(params[:id])
        render json: danceClass, status: :ok
    end

    def create
        @danceClass = DanceClass.create!(dance_class_params)
        render json: @danceClass, status: :created
    end

    def update
        @danceClass = DanceClass.find(params[:id])
        @danceClass.update!(dance_class_params)
        render json: @danceClass, status: :ok
    end

    def destroy
        @danceClass = DanceClass.find(params[:id])
        @danceClass.destroy
        render json: {}, status: :no_content
    end

    private
    def dance_class_params
        params.permit(:category, :location, :date, :start_time, :duration, :image)
    end

end
