class Friend < ApplicationRecord
  validates :friend_id, presence: true
  validates :user_id, presence: true
  belongs_to :user
  belongs_to :friend, class_name: 'User', foreign_key: :friend_id
end
