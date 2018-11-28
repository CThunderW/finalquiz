class Ability
    include CanCan::Ability
  
    def initialize(user)

      user ||= User.new 
      if user.admin?

        can :manage, :all
      else
        can :read, :all
      end
    
      alias_action(:create, :read, :update, :delete, to: :crud)

      can(:crud, Listing) do |listing|
        user == listing.user
      end
  
      can(:crud, Bid) do |bid|
        user == bid.user
      end
    end
  end