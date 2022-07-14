class MessagesController < ApplicationController
  skip_before_action :authorize, only: [:index]
  def create
    message = Message.create(edited: false, text: params[:text], user_id: params[:user_id], recipient_id: params[:recipient_id])
    friendship1 = Friend.where(user_id: params[:user_id], friend_id: params[:recipient_id])
    friendship2 = Friend.where(user_id: params[:recipient_id], friend_id: params[:user_id])
    friendship1.update(last_message: Time.new)
    friendship2.update(last_message: Time.new)
    render json: message, status: :created
  end

  def index
    sent = Message.where(user: params[:user_id], recipient: params[:recipient_id])
    recieved = Message.where(user: params[:recipient_id], recipient: params[:user_id])
    all = sent + recieved
    sorted = all.sort {|a, b| a.created_at <=> b.created_at}.reverse
    render json: sorted
  end
end
