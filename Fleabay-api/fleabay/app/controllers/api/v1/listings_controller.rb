module Api
    module V1
        class ListingsController < ApplicationController
            def index
                listings = Listing.order('created_at DESC')
                
                render json: {status: 'success', message: 'loaded listings', data:listings }, status: :ok
                
            end

            def show
                listing = Listing.find(params[:id])
                render json: {status: 'success', message: 'loaded listing', data: listing }, status: :ok
            end

            def create
                listing = Listing.new(listing_params)
                listing.user = current_user
                if listing.save
                    render json: {status: 'success', message: 'SAVED listing', data: listing }, status: :ok
                else 
                    render json: {status: 'error', message: 'listing not saved', data: listing.errors }, status: :unprocessable_entry
                end
            end

            def destroy
                listing = Listing.find(params[:id])
                listing.destroy
                render json: {status: 'deleted', message: 'listing deleted', data: listing.errors }, status: :ok
            end

            def update
                listing = Listing.find(params[:id])
                if listing.update_attributes(listing_params)
                    render json: {status: 'updated', message: 'listing updated', data: listing }, status: :ok
                end
            end



            private
            def listing_params
                params.require(:listing).permit(:title, :body)
            end


        end
    end
end
