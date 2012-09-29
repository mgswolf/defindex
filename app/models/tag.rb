# -*- encoding : utf-8 -*-
class Tag < ActiveRecord::Base
  extend FriendlyId
  attr_accessible :name
  has_and_belongs_to_many :posts


  friendly_id :name, use: :slugged

  def self.tokens(query)
  tags = where("name like ?", "%#{query}%")
  if tags.empty?
    [{id: "<<<#{query}>>>", name: "New: \"#{query}\""}]
  else
    tags
  end
end

def self.ids_from_tokens(tokens)
  tokens.gsub!(/<<<(.+?)>>>/) { create!(name: $1).id }
  tokens.split(',')
end
end
