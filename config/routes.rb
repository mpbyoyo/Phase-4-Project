Rails.application.routes.draw do
  

  post '/send', to: 'messages#create'
  get '/messages/:recipient_id', to: 'messages#index'

  post '/addfriend', to: 'friends#create'
  get '/friends/:user_id/', to: 'friends#index'
  get '/pending', to: 'friends#pending'
  delete '/friends/:id', to: 'friends#destroy'
  post '/acceptfriend', to: 'friends#accept'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/newpfp', to: 'users#update_pfp'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
