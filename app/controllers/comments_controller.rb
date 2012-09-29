# -*- encoding : utf-8 -*-
class CommentsController < ApplicationController
  def create
    @comment = Comment.new(params[:comment])
    if @comment.save
      redirect_to blog_path(@comment.post_id), notice: 'Seu comentário está aguardando aprovação'
    else
      redirect_to blog_index_path, alert: 'Não foi possivel gravar seu comentário'
    end
  end
end
