# -*- encoding : utf-8 -*-
class Post < ActiveRecord::Base
  extend FriendlyId
  attr_accessible :author, :body, :published, :slug, :title, :cover, :tag_tokens, :comments_attributes
  attr_reader :tag_tokens
  has_and_belongs_to_many :tags
  has_many :comments, :dependent => :destroy

  friendly_id :title, use: :slugged

  has_attached_file :cover, :styles => { :medium => "800x215#", :thumb => "100x30>" }

  accepts_nested_attributes_for :comments, :allow_destroy => true

  scope :published, where(published: true)

  def tag_tokens=(tokens)
  self.tag_ids = Tag.ids_from_tokens(tokens)
end
end
