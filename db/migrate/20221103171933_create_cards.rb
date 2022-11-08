class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.belongs_to :author, null: false, foreign_key: {to_table: :users}
      t.belongs_to :collection, null: false, foreign_key: true
      t.string :name
      t.string :asset_kind
      t.string :file_name
      t.string :variant
      t.integer :chosen_count, :default => 0

      t.timestamps
    end
  end
end
