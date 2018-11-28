PASSWORD = "Cale"

20.times do
    l = Listing.create({
        title: Faker::Book.title,
        body: Faker::Lorem.sentence
    })
    if l.valid?
        rand(0..10).times do
            l.bids << Bid.new(
                bidamount: rand(0..20)
            )
            end
        end
    end


5.times do
    User.create({
        
        first = Faker::Name.first_name
        last = Faker::Name.last_name
        email = Faker::Internet.email
        password = PASSWORD
        
    })
end


    

