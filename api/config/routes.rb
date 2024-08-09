Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        confirmations: "auth/confirmations",
        sessions: "auth/sessions",
        registrations: "auth/registrations",
      }

      namespace :current do
        resource :user, only: [:show]
      end

      namespace :wordcard do
        resources :cards, param: :uuid, only: [:index, :show, :create, :update, :destroy] do
          get "search", on: :collection

          resources :vocabularies, only: [:index, :create, :destroy]
          patch "vocabularies/update", to: "vocabularies#update"
          post "conjugation/create", to: "chat#create"

          resource :like, only: [:create, :destroy]
          resources :comments, only: [:index, :create, :destroy]
          resources :study_records, only: [:show, :create]
        end
        resources :ranked_cards, only: [:index]
        resources :study_records, only: [:index]
      end
    end
  end
end
