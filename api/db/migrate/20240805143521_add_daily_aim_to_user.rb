class AddDailyAimToUser < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.integer :daily_aim, null: false, default: 0
    end
  end
end
