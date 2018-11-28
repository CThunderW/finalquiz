class Listing < ApplicationRecord
    has_many :bids, dependent: :destroy
    belongs_to :user
    
    validates :title, presence: true
    validates :body, presence: true
end
