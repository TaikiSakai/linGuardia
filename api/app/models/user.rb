# frozen_string_literal: true

class User < ApplicationRecord
  has_many :cards, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_cards, through: :likes, source: :card

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  def like?(object)
    liked_cards.include?(object)
  end
end
