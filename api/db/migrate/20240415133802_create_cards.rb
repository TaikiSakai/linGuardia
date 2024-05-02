class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.string :uuid
      t.string :title, null: false
      t.integer :status, null: false
      t.integer :number_of_access, null: false, default: 0

      t.references :user, null: false, foreign_key: true
      t.timestamps

      t.index :uuid
    end
    add_index :cards, [:title, :user_id], unique: true
  end
end
