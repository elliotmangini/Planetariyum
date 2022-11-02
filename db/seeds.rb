puts "Clearing Database 💀💀💀"
User.destroy_all

puts "Seeding Database 🌱🍃🌱🍃🌱🍃"

puts "Creating Users 👤"
# MUST MEET VALIDATIONS!!!
elliot = User.create(username: "BigSister", password: "123456", bio: "Big Sis", email: "elliot.mangini@gmail.com", twitch_username: "biigsiister")
gabe = User.create(username: "Sine Caster", password: "123456", bio: "Big Sis", email: "sinecaster@gmail.com", twitch_username: "SineCasterMusic")



puts "Database Seeded ✅✅✅✅✅✅"