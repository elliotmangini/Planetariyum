require 'faker'

puts 'Clearing Database 💀💀💀'
Publication.destroy_all
User.destroy_all
Follow.destroy_all
Collection.destroy_all
Nft.destroy_all
Card.destroy_all
Game.destroy_all
Playing.destroy_all
Vod.destroy_all

puts 'Seeding Database 🌱🍃🌱🍃🌱🍃'

puts 'Creating Publications 🗞🗞🗞🗞🗞'
story1 = Publication.create(title: "Welcome to Planetariyum",
body: "",
kind: "large", route: nil, runtime: 10000)
story1_cover_blob = story1.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/grid_rectangle_1.png')), filename: 'grid_rectangle_1.png')

story2 = Publication.create(title: "New Release: Planetariyum Base",
body: "",
kind: "", route: nil, runtime: 10000)
story2_cover_blob = story2.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/grid_square_1.png')), filename: 'grid_square_1.png')

story3 = Publication.create(title: "About The Creators",
body: "",
kind: "", route: nil, runtime: 10000)
story3_cover_blob = story3.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/grid_square_2.png')), filename: 'grid_square_2.png')


story5 = Publication.create(title: "Web 3.0 Integration",
body: "",
kind: "", route: nil, runtime: 10000)
story5_cover_blob = story5.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/grid_square_3.png')), filename: 'grid_square_3.png')

story4 = Publication.create(title: "Limited Time Invite Offer",
body: "",
kind: "large", route: nil, runtime: 10000)
story4_cover_blob = story4.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/grid_rectangle_2.png')), filename: 'grid_rectangle_2.png')

story6 = Publication.create(title: "Reach Out (and Hire Me)",
body: "",
kind: "", route: nil, runtime: 10000)
story6_cover_blob = story6.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/grid_square_4.png')), filename: 'grid_square_4.png')



puts 'Creating Users 👤'
# MUST MEET VALIDATIONS!!!
planetariyumwallet = User.create(
    username: 'planetariyumwallet',
    display_name: 'Wallet',
    password: '123456verysecure',
    bio: 'account holding nfts by default',
    email: 'yungbigsister@gmail.com'
)
wallet_avatar = planetariyumwallet.avatar.attach(io: File.open(File.join(Rails.root,'/app/assets/avatars/Octopus_God_pfp.png')), filename: 'Octopus_God_pfp.png')

elliot = User.create(
    username: 'bigsister',
    display_name: 'Big Sister',
    password: '123456',
    bio: 'this is big sisters bio',
    email: 'elliot.mangini@gmail.com',
    twitch_username: 'biigsiister',
    site_theme: 'dark'
)
# ACTIVE STORAGE SEEDING EXAMPLE
elliot_avatar = elliot.avatar.attach(io: File.open(File.join(Rails.root,'/app/assets/avatars/Octopus_God_pfp.png')), filename: 'Octopus_God_pfp.png')

gabe = User.create(
    username: 'sinecaster',
    display_name: 'Sine Caster',
    password: '123456',
    bio: 'this is gabes bio',
    email: 'sinecaster@gmail.com',
    twitch_username: 'SineCasterMusic'
)
gabe_avatar = gabe.avatar.attach(io: File.open(File.join(Rails.root,'/app/assets/avatars/gabepfp.png')), filename: 'gabepfp.png')

# FOLLOWINGS
Follow.create(follower_id: elliot.id, following_id: gabe.id)

puts 'Creating Collections 🗂🗂🗂'
yumBase = elliot.collections.create(
    name: 'Planetariyum Base',
    description: 'First Set on the platform. Over 500 sounds crafted over 5+ years with an emphasis on powerful drums. 
                Influences at the convergance point of UK sensibilities, tech brilliance, old skool dirt, and sound design experimentation. 
                Transient-heavy, maximized whatever the tonality, and suitable for any style. 
                This release is only available on Planetariyum and represents the first series of On-Label Mints. 
                All artworks were generated with AI and edited/composited by Big Sis. Hope you enjoy!
                ',
    embed_url: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1026688306&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    local_url: 'base',
    featured_content: 'none at this time'
)
yumBase_art_blob = yumBase.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Planetariyum_Base_art.png')), filename: 'Planetariyum_Base_art.png')
yumBase_card_back_blob = yumBase.card_back.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/card_back.jpg')), filename: 'card_back.jpg')

coll1 = elliot.collections.create(name: 'Test Collection 1')
coll1_art_blob = coll1.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_1.png')), filename: 'Test_Collection_Art_1.png')

coll2 = elliot.collections.create(name: 'Test Collection 2')
coll2_art_blob = coll2.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_2.png')), filename: 'Test_Collection_Art_2.png')

coll3 = elliot.collections.create(name: 'Test Collection 3')
coll3_art_blob = coll3.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_3.png')), filename: 'Test_Collection_Art_3.png')

coll4 = elliot.collections.create(name: 'Test Collection 4')
coll4_art_blob = coll4.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_4.png')), filename: 'Test_Collection_Art_4.png')

coll5 = elliot.collections.create(name: 'Test Collection 5')
coll5_art_blob = coll5.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_5.png')), filename: 'Test_Collection_Art_5.png')

coll6 = elliot.collections.create(name: 'Test Collection 6')
coll6_art_blob = coll6.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_6.png')), filename: 'Test_Collection_Art_6.png')

coll7 = elliot.collections.create(name: 'Test Collection 7')
coll7_art_blob = coll7.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_7.png')), filename: 'Test_Collection_Art_7.png')

coll8 = elliot.collections.create(name: 'Test Collection 8')
coll8_art_blob = coll8.collection_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/collection_arts/Test_Collection_Art_8.png')), filename: 'Test_Collection_Art_8.png')


puts 'Creating Cards 🃏🃏🃏🃏🃏'

100.times do |i|
    yumBase_card = elliot.cards.create(
        # chosen_count: DEFAULTS TO 0
        collection_id: yumBase.id,
        name: "card #{i}",
        asset_kind: 'kick',
        file_name: 'Big_Sister_Kick_Geef_01.wav',
        variant: '1'
    )
    art_blob = yumBase_card.card_art.attach(io: File.open(File.join(Rails.root,'/app/assets/cards/card_arts/Test-Card.png')), filename: 'Test-Card.png')
    asset_blob = yumBase_card.card_asset.attach(io: File.open(File.join(Rails.root,'/app/assets/cards/card_assets/Big_Sister_Kick_Geef_01.wav')), filename: 'Big_Sister_Kick_Geef_01.wav')

end

# GENERIC
100.times do |i|
    card = elliot.cards.create(
        # chosen_count: DEFAULTS TO 0
        collection_id: coll1.id,
        name: "card #{i}",
        asset_kind: 'kick',
        file_name: 'Big_Sister_Kick_Geef_01.wav',
        variant: '1'
    )
end
# ACTIVE STORAGE SEED EXAMPLE THREE
# yumBase_card1_asset_blob = yumBase_card1.card_asset.attach(io: File.open(File.join(Rails.root,'/app/assets/cards/card_assets/Big_Sister_Kick_Geef_01.wav')), filename: 'Big_Sister_Kick_Geef_01.wav')
# yumBase_card1_art_blob = yumBase_card1.card_art.attach(io: File.open(File.join(Rails.root,'/app/assets/cards/card_arts/Big_Sister_Kick_Geef_01_art.png')), filename: 'Big_Sister_Kick_Geef_01_art.png')


puts 'Creating Games 🎮🎮🎮'
game1 = Game.create(deadline: DateTime.new(2001,2,3,4,5,6), collection: yumBase)

puts 'Creating Playings 🚣‍♀️🤺'
elliot.playings.create(game_id: game1.id)
gabe.playings.create(game_id: game1.id)


puts 'Database Seeded ✅✅✅✅✅✅'