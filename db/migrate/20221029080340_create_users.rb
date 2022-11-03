class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :display_name
      t.string :email
      t.string :bio
      t.string :site_theme
      t.string :custom_theme
      t.string :default_timezone, :default => "GMT"
      t.string :twitch_username
      t.string :password_digest

      t.timestamps
    end
  end
end
