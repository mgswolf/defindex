# -*- encoding : utf-8 -*-
class Admin::PostsController < Admin::BaseController
  before_filter :get_post, :only => [:show, :edit, :update, :destroy]


  def index
    @search = Post.search(params[:search])
    @posts = @search.page params[:page]
  end

  def show
  end

  def new
    @post = Post.new
  end

  def edit
  end

  def create
    @post = Post.new(params[:post])
    if @post.save
      redirect_to [:admin,@post], notice: 'Post criado com sucesso.'
    else
      render 'new'
    end
  end

  def update
    if @post.update_attributes(params[:post])
      redirect_to [:admin,@post], notice: 'Post atualizado'
    else
      render 'edit'
    end
  end

  def destroy
    if @post.destroy
      redirect_to admin_posts_path, notice: "Post excluido"
    else
      redirect_to admin_posts_path, notice: "Post não excluido"
    end
  end


  private
  def get_post
    @post = Post.find(params[:id])
  end

end
