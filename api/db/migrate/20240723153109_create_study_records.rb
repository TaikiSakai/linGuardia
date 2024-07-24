class CreateStudyRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :study_records do |t|
      t.references :card, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :word_count, null: false
      t.date :date, null: false
      t.timestamps
    end
    add_index :study_records, [:card_id, :user_id, :date], unique: true
  end
end
