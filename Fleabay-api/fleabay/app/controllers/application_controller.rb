class ApplicationController < ActionController::Base

    private
  
    def current_user
        puts 'inside current_user method'
      if session[:user_id].present?
        puts 'inside if block'
        @current_user ||= User.find(session[:user_id])
      end
    end
    helper_method :current_user
    # by addinng the `helper_method` above 👆, we make this method available in
    # the view files. Normally, it's only available in controllers.
  
    def user_signed_in?
      current_user.present?
    end
    helper_method :user_signed_in?
  
    def authenticate_user!
      unless user_signed_in?
        flash[:danger] = 'You must sign in or sign up first!'
        redirect_to new_sessions_path
      end
    end
  
  end