puts "Clearing Database 💀💀💀"
User.destroy_all

puts "Seeding Database 🌱🍃🌱🍃🌱🍃"

puts "Creating Users 👤"
# MUST MEET VALIDATIONS!!!
elliot = User.create(username: "BigSister", password: "123456", bio: "Big Sis", email: "elliot.mangini@gmail.com", twitch_username: "biigsiister")
elliot.avatar.attach(io: File.open(File.join(Rails.root,'/app/assets/Octopus_God_pfp.png')), filename: 'Octopus_God_pfp.png')

gabe = User.create(username: "Sine Caster", password: "123456", bio: "Big Sis", email: "sinecaster@gmail.com", twitch_username: "SineCasterMusic")



puts "Database Seeded ✅✅✅✅✅✅"