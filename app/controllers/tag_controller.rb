# -*- encoding : utf-8 -*-
class TagController < ApplicationController
  def show
    @tag = Tag.find(params[:id], include: [:posts])
    @posts = @tag.posts.published.page params[:page]
  end
end
