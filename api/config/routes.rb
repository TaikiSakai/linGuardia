Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        confirmations: "auth/confirmations",
        sessions: "auth/sessions",
      }

      namespace :current do
        resource :user, only: [:show]
      end

      namespace :wordcard do
        resources :cards, param: :uuid, only: [:index, :show, :create, :update, :destroy] do
          get "search", on: :collection

          resources :vocabularies, only: [:index, :create, :destroy]
          patch "vocabularies/update", to: "vocabularies#update"
          patch "vocabularies/update_conjugation", to: "vocabularies#update_conjugation"
          post "conjugation/create", to: "chat#create"

          resource :like, only: [:create, :destroy]
          resources :comments, only: [:index, :create, :destroy]
        end
        resources :ranked_cards, only: [:index]
      end
    end
  end
end
