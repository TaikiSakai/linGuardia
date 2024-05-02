Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"
      mount_devise_token_auth_for "User", at: "auth"

      namespace :current do
        resource :user, only: [:show]
      end

      namespace :wordcard do
        resources :cards, param: :uuid, only: [:index, :show, :create, :update, :destroy] do
          resources :vocabularies, only: [:index, :create, :destroy]
          patch "vocabularies/update", to: "vocabularies#update"
          # delete "vocabularies/delete", to: "vocabularies#destroy"
        end
      end
    end
  end
end
