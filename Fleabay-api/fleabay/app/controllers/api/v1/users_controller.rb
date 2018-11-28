class Api::V1::UsersController < Api::ApplicationController
    def current
        puts 'getting current_user'
        puts current_user
        render json: current_user
    end
end

