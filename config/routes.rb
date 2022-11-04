Rails.application.routes.draw do
  scope '/api' do
    resources :reviews
    resources :bookings
    resources :users, only: [:show, :create, :update]
    resources :dance_classes
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
    post '/signin', to: 'sessions#create'
    post '/signup', to: 'users#create'
    get '/auth', to: 'users#show'
    delete '/logout', to: 'sessions#destroy'
  end

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
