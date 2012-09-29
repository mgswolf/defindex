# -*- encoding : utf-8 -*-
class AddAttachmentCoverToPosts < ActiveRecord::Migration
  def self.up
    change_table :posts do |t|
      t.has_attached_file :cover
    end
  end

  def self.down
    drop_attached_file :posts, :cover
  end
end
