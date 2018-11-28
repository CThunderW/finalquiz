Rails.application.routes.draw do
  namespace 'api' do
    namespace 'v1' do
      resources :listings, only: [:index, :show, :create, :destroy]
      resource :sessions, only: [:create, :destroy]
      resources :users, only: [] do
        get :current, on: :collection
      end
    end
  end

  resources :listings do 
    resources :bids, only: [:create, :destroy]
  end

  resources :users, only: [:new, :create, :show]
  resource :sessions, only: [:new, :create, :destroy]

  get('/', {to: 'welcome#home', as: :home})
  root({ to: 'welcome#home'})
end
