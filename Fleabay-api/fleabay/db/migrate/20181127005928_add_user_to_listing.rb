class AddUserToListing < ActiveRecord::Migration[5.2]
  def change
    add_reference :listings, :user, foreign_key: true
    add_reference :bids, :user, foreign_key: true
    add_reference :bids, :listing, foreign_key: true
  end
end
