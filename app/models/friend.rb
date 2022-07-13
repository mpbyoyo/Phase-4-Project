class Friend < ApplicationRecord
  validates :friend_id, presence: true
  validates :user_id, presence: true
  belongs_to :user
end
