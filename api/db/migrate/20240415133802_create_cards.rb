class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.integer :status, null: false
      t.integer :number_of_access

      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
