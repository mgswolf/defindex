# -*- encoding : utf-8 -*-
class Admin::TagsController < Admin::BaseController
def index
  @tags = Tag.order(:name)
  respond_to do |format|
    format.html
    format.json { render json: @tags.tokens(params[:q]) }
    format.xml {render xml: @tags}
  end
end
end
