class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  #before_action :authorized
  before_action :authorize_user, except: :current_user
  # skip_before_action :authorize_user, only: [:current_user]

  #current_user and authorized_user
  def current_user
      user = User.find_by(id: session[:user_id])
      user
  end

  def authorize_user
      render json: { error: "Please sign in" }, status: :unauthorized unless current_user
  end

  private

  def render_unprocessable_entity(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found
      render json: { error: "Requested Object not found" }, status: :not_found
  end

end
