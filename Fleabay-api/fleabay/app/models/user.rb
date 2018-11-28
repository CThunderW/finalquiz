class User < ApplicationRecord
    has_many :bids, dependent: :destroy
    has_many :listings, dependent: :destroy
    has_secure_password
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

    validates :first, presence: true
    validates :email, presence: true,
                      uniqueness: true,
                      format: VALID_EMAIL_REGEX
  
    def full_name
      "#{first} #{last}".strip
    end
end
