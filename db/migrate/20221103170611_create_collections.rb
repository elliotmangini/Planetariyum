class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.string :name
      t.string :description
      t.string :embed_url
      t.string :local_url
      t.string :featured_content
      t.belongs_to :creator, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
