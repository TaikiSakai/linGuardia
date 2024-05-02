class CreateVocabularies < ActiveRecord::Migration[7.0]
  def change
    create_table :vocabularies do |t|
      t.string :uuid
      t.string :word, null: false
      t.string :meaning

      t.references :card, null: false, foreign_key: true
      t.timestamps

      t.index :uuid
    end
  end
end
