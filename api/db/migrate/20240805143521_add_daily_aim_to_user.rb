class AddDailyAimToUser < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      t.string :learing_language
      t.string :language_level
      t.integer :daily_aim, null: false
      t.text :comment
    end
  end
end
