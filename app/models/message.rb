class Message < ApplicationRecord
  belongs_to :user
  belongs_to :recipient, class_name: 'User', foreign_key: :recipient_id

  validates :user, presence: true
  validates :recipient, presence: true
end
