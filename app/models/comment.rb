# -*- encoding : utf-8 -*-
class Comment < ActiveRecord::Base
  belongs_to :post
  attr_accessible :post_id, :approved, :body, :name

  validates :name, :body, :post_id, :presence => true

  scope :approved, where(approved: true)
end
