class CreateWordRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :word_roles do |t|
      t.references :vocabulary, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true
      t.timestamps
    end
  end
end
