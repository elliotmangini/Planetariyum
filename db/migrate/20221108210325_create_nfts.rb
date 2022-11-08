class CreateNfts < ActiveRecord::Migration[7.0]
  def change
    create_table :nfts do |t|
      t.string :edition
      t.string :scan_digest
      t.string :address
      t.belongs_to :card, null: false, foreign_key: true
      t.belongs_to :game, null: false, foreign_key: true
      t.belongs_to :owner, null: false, foreign_key: {to_table: :users}
      t.belongs_to :holder, null: false, foreign_key: {to_table: :users}
      

      t.timestamps
    end
  end
end
