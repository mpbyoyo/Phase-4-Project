class FriendsController < ApplicationController

  def create
    friend = User.find_by(username: params[:friend])
    user = User.find(params[:user_id])
    friendship = Friend.create!(friend_id: friend.id, user_id: params[:user_id], last_message: Time.new)
    render json: {id: friendship.id, friend: {id: friend.id, username: friend.username, pfp: friend.pfp}, user: {id: user.id, username: user.username, pfp: user.pfp}}, status: :created
  end

  def index
    friendships = Friend.where(user_id: params[:user_id])
    map_friends = friendships.map do |e|
      friend = User.find(e.friend_id)
      user = User.find(params[:user_id])
      {id: e.id, friend: {id: friend.id, username: friend.username, pfp: friend.pfp}, user: {id: user.id, username: user.username, pfp: user.pfp}, last_message: e.last_message}
    end
    render json: map_friends
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
    friend = User.find(params[:friend])
    user = User.find(session[:user_id])
    friendship = Friend.create!(friend_id: friend.id, user_id: session[:user_id])
    render json: {id: friendship.id, friend: {id: friend.id, username: friend.username, pfp: friend.pfp}, user: {id: user.id, username: user.username, pfp: user.pfp}}, status: :created
  end
end
