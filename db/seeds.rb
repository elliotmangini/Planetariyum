puts "Clearing Database 💀💀💀"
User.destroy_all

puts "Seeding Database 🌱🍃🌱🍃🌱🍃"

puts "Creating Users 👤"
elliot = User.create(username: "BigSister", password: "a", bio: "Big Sis", email: "elliot.mangini@gmail.com", twitch_username: "biigsiister")



puts "Database Seeded ✅✅✅✅✅✅"