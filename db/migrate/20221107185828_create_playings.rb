class CreatePlayings < ActiveRecord::Migration[7.0]
  def change
    create_table :playings do |t|
      t.integer :turn_order
      t.belongs_to :game, null: false, foreign_key: true
      t.belongs_to :player, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
