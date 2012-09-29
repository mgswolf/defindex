# -*- encoding : utf-8 -*-
class Notifier < ActionMailer::Base
  default from: "mgswolf@gmail.com"

  def comment(comment)
    @comment = comment
    mail(:to => "mgswolf@gmail.com", :subject => "Novo Comentário - DefIndex")
  end
end
