class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :edited, :user_id, :recipient_id
end
