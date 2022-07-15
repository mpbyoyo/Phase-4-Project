class FriendsController < ApplicationController

  def create
    friend = User.find_by(username: params[:friend])
    friendship = Friend.create!(friend_id: friend.id, user_id: session[:user_id], last_message: Time.new)
    render json: friendship, status: :created
  end

  def index
    friendships = Friend.where(user_id: session[:user_id])
    render json: friendships
  end

  def destroy
    friendship = Friend.find(params[:id])
    friend = friendship.friend_id
    friendships = Friend.find_by(user_id: friend, friend_id: session[:user_id])
    friendship.delete
    friendships.delete
    render json: {}, status: :ok
  end

  def pending
    friended_by = Friend.where(friend_id: session[:user_id])
    friended = Friend.where(user_id: session[:user_id]).map { |e| e.friend_id }
    pending = friended_by.filter { |e| !friended.include?(e.user_id) }
    pending_sorted = pending.sort {|a, b| a.created_at <=> b.created_at}.reverse
    render json: pending_sorted
  end

  def accept
    friendship = Friend.create!(friend_id: params[:friend], user_id: session[:user_id])
    render json: friendship, status: :created
  end
end
