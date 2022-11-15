puts "🌱 Seeding Nritya Acedomy..."
admin = User.create(
  first_name: "Admin First",
  last_name: "Admin Last",
  email: "admin@gmail.com",
  password: "admin",
  admin: true
  )

  # Make 
  [["Jazz", "Excellent", "https://st.depositphotos.com/1965665/3640/i/600/depositphotos_36403809-stock-photo-graceful-dancer.jpg"],
   ["Tap Dance", "Good", "https://media.istockphoto.com/photos/images-from-a-dance-studio-picture-id1184742104?k=20&m=1184742104&s=612x612&w=0&h=ORBWR9JpRnJ64e-PFEzFEXgNi5sVMJ8ERT2l-nLt5gY="],
    ["Belly Dance", "Peaceful", "https://www.cmuse.org/wp-content/uploads/2020/05/learn-belly-dance-lessons-online.jpg"], 
    ["Salsa", "Nice", "https://www.wikidancesport.com/Attachments/dances/Salsa/Salsa%20-%204.jpg"], 
    ["Bollywood", "Very Nice", "https://res.cloudinary.com/hkf2ycaep/image/fetch/d_project-placeholder.png,f_auto,fl_lossy/https://d23vk1trp0fmbf.cloudfront.net/projects/0c76a571-919d-4faf-8da3-c0a8f141cef1/project-image"]].each do |dance|
    # create a game with random data
    dance_class = DanceClass.create(
      category: dance.first,
      location: Faker::Address.city,
      date: Faker::Date.forward(days: 20),
      start_time: "10:00 AM",
      duration: Faker::Number.between(from: 1, to: 2),
      image: dance.last)
    
    user = User.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      password: Faker::Internet.password,
      admin: false
      )
  
    # A booking belongs to a dance_class and a user, so we must provide those foreign keys
    Booking.create(
      fee: 10,
      paid: true,
      user_id: user.id,
      dance_class_id: dance_class.id)

    Review.create(
        comment: dance[1],
        rating: Faker::Number.between(from: 1, to: 10),
        user_id: user.id,
        dance_class_id: dance_class.id)

  end

puts "✅ Done seeding!"