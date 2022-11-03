puts 'Clearing Database 💀💀💀'
User.destroy_all
Collection.destroy_all
Card.destroy_all

puts 'Seeding Database 🌱🍃🌱🍃🌱🍃'

puts 'Creating Users 👤'
# MUST MEET VALIDATIONS!!!
elliot = User.create(username: 'BigSister', password: '123456', bio: 'Big Sis', email: 'elliot.mangini@gmail.com', twitch_username: 'biigsiister')
# ACTIVE STORAGE SEEDING EXAMPLE
elliot_avatar = elliot.avatar.attach(io: File.open(File.join(Rails.root,'/app/assets/avatars/Octopus_God_pfp.png')), filename: 'Octopus_God_pfp.png')

gabe = User.create(username: 'Sine Caster', password: '123456', bio: 'Big Sis', email: 'sinecaster@gmail.com', twitch_username: 'SineCasterMusic')

puts 'Creating Collections 🗂🗂🗂'
yumBase = elliot.collections.create(name: 'Planetariyum Base')
yumBase_art_blob = yumBase.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Planetariyum_Base_art.png')), filename: 'Planetariyum_Base_art.png')

puts 'Creating Cards 🃏🃏🃏🃏🃏'
yumBase_card1 = elliot.cards.create(
    collection_id: yumBase.id,
    name: 'Geef',
    asset_kind: 'kick',
    file_name: 'Big_Sister_Kick_Geef_01.wav',
    variant: '1',
    # chosen_count: DEFAULTS TO 0
)
# ACTIVE STORAGE SEED EXAMPLE THREE
yumBase_card1_asset_blob = yumBase_card1.card_asset.attach(io: File.open(File.join(Rails.root,'/app/assets/cards/card_assets/Big_Sister_Kick_Geef_01.wav')), filename: 'Big_Sister_Kick_Geef_01.wav')
yumBase_card1_art_blob = yumBase_card1.card_art.attach(io: File.open(File.join(Rails.root,'/app/assets/cards/card_arts/Big_Sister_Kick_Geef_01_art.png')), filename: 'Big_Sister_Kick_Geef_01_art.png')

puts 'Database Seeded ✅✅✅✅✅✅'