Rails.application.routes.draw do
  scope '/api' do
    resources :reviews
    resources :bookings
    resources :users, only: [:index, :show, :create]
    resources :dance_classes
  end

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
