class Card < ApplicationRecord
  belongs_to :user
  has_many :vocabularies, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :comments, dependent: :destroy
  has_many :card_categories, dependent: :destroy
  has_many :categories, through: :card_categories

  validates :title, presence: true, length: { minimum: 1, maximum: 20 }, uniqueness: { scope: :user_id }
  validates :status, presence: true
  enum :status, { close: 0, open: 1 }

  # front側から見える値はuuidを使用する
  before_create -> { self.uuid = SecureRandom.uuid }

  def self.save_with_categories!(card:, category_params:)
    categories = category_params[:name]

    ActiveRecord::Base.transaction do
      # frontから送信されたcategoryを上書きする・空欄の場合は何もしない
      if categories.empty?
        card.categories = []
      else
        new_categories = categories.map {|name| Category.find_or_initialize_by(name: name)}
        card.categories = new_categories
      end
      card.save!
    end
  end

  # 単語帳の所有者でないユーザーが単語帳にアクセスしたら、アクセス数をカウントアップする
  def count_access_number(object)
    object.number_of_access << object.number_of_access += 1
    object.save!
  end

  def how_many_likes(object)
    object.likes.count
  end
end
