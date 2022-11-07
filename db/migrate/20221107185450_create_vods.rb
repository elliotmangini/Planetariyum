class CreateVods < ActiveRecord::Migration[7.0]
  def change
    create_table :vods do |t|
      t.belongs_to :streamer, null: false, foreign_key: { to_table: :users }
      t.belongs_to :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
