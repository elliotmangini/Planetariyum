class CreatePublications < ActiveRecord::Migration[7.0]
  def change
    create_table :publications do |t|
      t.string :title
      t.string :body
      t.string :kind
      t.string :route
      t.integer :runtime

      t.timestamps
    end
  end
end
