class FriendSerializer < ActiveModel::Serializer
  attributes :id, :friend, :last_message
  has_one :user
end
