class Card < ApplicationRecord
  belongs_to :user
  has_many :vocabularies, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user
  has_many :comments, dependent: :destroy
  has_many :card_categories, dependent: :destroy
  has_many :categories, through: :card_categories

  validates :title, presence: true, length: { minimum: 1, maximum: 20 },\
                    uniqueness: { scope: :user_id }
  validates :status, presence: true
  enum :status, { close: 0, open: 1 }

  # front側から見える値はuuidを使用する
  before_create -> { self.uuid = SecureRandom.uuid }

  def save_with_categories(category_params:)
    categories = category_params[:name]

    ActiveRecord::Base.transaction do
      # frontから送信されたcategoryを上書きする・空欄の場合は何もしない
      if categories.empty?
        self.categories = []
      else
        new_categories = categories.map {|name| Category.find_or_initialize_by(name: name) }
        self.categories = new_categories
      end

      self.save!
      true
    end
  rescue ActiveRecord::RecordInvalid
    false
  end

  # 単語帳の所有者でないユーザーが単語帳にアクセスしたら、アクセス数をカウントアップする
  def count_access_number
    self.number_of_access += 1

    return if self.save

    logger.error "アクセス数の更新に失敗しました (card_id: #{self.id})"
  end

  def how_many_likes
    self.likes.count
  end

  def self.ransackable_attributes(auth_object=nil)
    ["title"]
  end
end
