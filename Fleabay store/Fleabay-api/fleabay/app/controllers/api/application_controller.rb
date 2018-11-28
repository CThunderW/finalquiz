
class Api::ApplicationController < ApplicationController
    # this skips using `authenticity_token` to prevent XSS attacks
    # we should make sure we have other measures of secutiy within our API
    # such as API keys
    skip_before_action :verify_authenticity_token
    
    # The priority for "rescue_from" is in the reverse order
    # of where the calls are made. Meaning that more specific errors
    # should appear last while broader should appear first
    
    # The "StandardError" is the error class that all programmer errors
    # classes inherent from. Rescuing it will prevent nearly all errors from
    # crashing our program.
    rescue_from StandardError, with: :standard_error
    # Use the method "rescue_from" in a Controller to interrupt
    # it from crashing our program.
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
    
    def not_found
        render(
        status: 404, # Not Found
        json: {
            status: 404,
            errors: [{
            type: "NotFound"
            }]
        }
        )
    end
    
    private
    def authenticate_user!
        unless user_signed_in?
        render(json: { errors: ["Unauthorized"] }, status: 401)
        end
    end
    
    def record_not_found(error)
        # byebug
        render(
        status: 404,
        json: {
            status: 404,
            errors: [{
            type: error.class.to_s,
            message: error.message
            }]
        }
        )
    end
    
    def standard_error(error)
        # When we rescue error we prevent our program from doing
        # what it would normally in a crash such logging the error
        # details and the backtrace. It's important that keep logging
        # this information after intercepting an error.
    
        # Use the `logger.error` method with an error's message to
        # to log the error details again.
        logger.error error.full_message
    
        render(
        status: 500,
        json: {
            status: 500,
            errors: [{
            type: error.class.to_s,
            message: error.message
            }]
        }
        )
    end
    
    def record_invalid(error)
        record = error.record
        errors = record.errors.map do |field, message|
        {
            type: error.class.to_s,
            record_type: record.class.to_s,
            field: field,
            message: message
        }
        end
        
        render(
        status: 422, # Unprocessable Entity
        json: {
            status: 422,
            errors: errors
        }
        )
    end
    
end