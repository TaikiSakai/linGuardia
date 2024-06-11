class Card < ApplicationRecord
  belongs_to :user
  has_many :vocabularies, dependent: :destroy

  validates :title, presence: true, length: { minimum: 1, maximum: 20 }, uniqueness: { scope: :user_id }
  validates :status, presence: true
  enum :status, { close: 0, open: 1 }

  # front側から見える値はuuidを使用する
  before_create -> { self.uuid = SecureRandom.uuid }

  # 単語帳の所有者でないユーザーが単語帳にアクセスしたら、アクセス数をカウントアップする
  def count_access_number
    increment!(:number_of_access, 1)    
  end
end
