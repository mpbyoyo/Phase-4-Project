class FriendSerializer < ActiveModel::Serializer
  attributes :id, :friend_id, :last_message
  has_one :user
end
