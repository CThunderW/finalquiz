class ListingsController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy]
    before_action :find_answer, only: [:destroy]
    before_action :authorize_user!, only: [:destroy]

    def new
        @listing = Listing.new
    end

    def create 
        @listing = Listing.new listing_params
        @listing.user = current_user
        if @listing.save
            redirect_to listing_path(@listing)
        else
            render :new
        end
    end

    def index
        @listings = Listing.all.order(created_at: :desc)
        respond_to do |format|
            format.html {render}
            format.json {render json: @listings}
            format.text {render plain: 'plaintextlol'}
        end
    end

    def show
        @bids = @listing.bids.order(created_at: :desc)
        @bid = Bid.new
    end

    def destroy
        @listing.destroy
        redirect_to listings_path
    end

    def edit
    end

    def update
        @listing.slug = nil
        if @listing.update listing_params
            redirect_to listing_path(@listing)
        else
            render :edit
        end
    end

    private
    def listing_params
        params.require(:listing).permit(:title, :body, :reserve, :currentbid)
    end

    def find_listing
        @listing = Listing.find params[:id]
    end

     
end
    