class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.string :name
      t.belongs_to :creator, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
