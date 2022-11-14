class CreateRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :rooms do |t|
      t.references :roomable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
