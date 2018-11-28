class BidsController < ApplicationController
    
    def create
        @listing = Listing.find params[:listing_id]
        @bid = Bid.new bid_params
        @bid.listing = @listing
        @bid.user = current_user
        if @bid.save
            redirect_to listing_path(@listing)
        else
            @bids = @listing.bids.order(created_at: :desc)
            render "listings/show"
        end
    end

    def destroy
        @bid = Bid.find params[:id]
        @bid.destroy
        redirect_to(listings_path)
    end




    private
    def bid_params
        params.require(:bid).permit(:bidamount)
    end
    
    def find_bid
        @bid = Bid.find params[:id]
    end
end

