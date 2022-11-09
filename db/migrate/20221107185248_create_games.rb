class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.datetime :deadline
      t.string :game_type
      t.string :local_url
      t.integer :deck_size
      t.belongs_to :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
