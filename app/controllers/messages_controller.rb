class MessagesController < ApplicationController
  skip_before_action :authorize, only: [:create, :index]
  def create
    message = Message.create(edited: false, text: params[:text], user_id: params[:user_id], recipient_id: params[:recipient_id])
    render json: message, status: :created
  end

  def index
    sent = Message.where(user: params[:user_id], recipient: params[:recipient_id])
    recieved = Message.where(user: params[:recipient_id], recipient: params[:user_id])
    all = sent + recieved
    sorted = all.sort {|a, b| a.created_at <=> b.created_at}
    render json: sorted
  end
end
