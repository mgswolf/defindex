# -*- encoding : utf-8 -*-
class BlogController < ApplicationController

  def index
    @search = Post.published.search(params[:search])
    @posts = @search.page(params[:page]).per(15)
  end

  def show
    @post = Post.published.find(params[:id], include: [:comments])
    @comment = Comment.new
    @title = "#{@post.title} - "
    @description = @post.summary
  end

end
