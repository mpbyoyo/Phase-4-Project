class FriendsController < ApplicationController
  skip_before_action :authorize, only: [:create, :index, :destroy] # remove once sessions are set up

  def create
    friend = User.find_by(username: params[:friend])
    user = User.find(params[:user_id])
    friendship = Friend.create!(friend_id: friend.id, user_id: params[:user_id])
    render json: {id: friendship.id, friend: {id: friend.id, username: friend.username, pfp: friend.pfp}, user: {id: user.id, username: user.username, pfp: user.pfp}}, status: :created
  end

  def index
    friendships = Friend.where(user_id: params[:user_id])
    map_friends = friendships.map do |e|
      friend = User.find(e.friend_id)
      user = User.find(params[:user_id])
      {id: e.id, friend: {id: friend.id, username: friend.username, pfp: friend.pfp}, user: {id: user.id, username: user.username, pfp: user.pfp}}
    end
    render json: map_friends
  end

  def destroy
    friendship = Friend.find(params[:id])
    friendship.delete
    render json: {}, status: :ok
  end
end
