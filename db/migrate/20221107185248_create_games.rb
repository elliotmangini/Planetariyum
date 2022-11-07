class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.datetime :deadline
      t.belongs_to :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
