# -*- encoding : utf-8 -*-
class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :author
      t.text :body
      t.boolean :published
      t.string :slug

      t.timestamps
    end
    add_index :posts, :slug, unique: true
  end
end
