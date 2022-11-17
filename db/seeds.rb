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
body: "

If you're an artist looking for a new social platform to call home, you may want to check out Planetariyum. This new platform is being developed using ruby on rails and react, and it looks like it could be a great place for artists to collaborate and share their work.

One of the key features of Planetariyum is that it will allow creators to get paid fairly for their work. That's something that is often lacking on other social platforms, so it's definitely a selling point for this new platform.

In addition to being a place to share your work, Planetariyum will also offer exclusive content for its members. So if you're looking for a new social platform that supports artists and creators, Planetariyum may be worth checking out.

So! welcome to our social network for artists! We are excited to have
you here and hope that you will find our community to be a
supportive and creative space. Our site is filled with features
that will help you connect with other artists, showcase your work,
and get inspired. Here are a few things you can do to get started:",
kind: "large", route: nil, runtime: 10000)
story1_cover_blob = story1.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/robot6.png')), filename: 'robot6.png')

story2 = Publication.create(title: "Planetariyum Base",
body: "Dear artists and musicians,
If you're looking for something new and exciting to check out, I highly recommend the Planetariyum Base collection of sounds. It's full of otherworldly, dreamlike textures that are perfect for creating atmospheric and ambient music.
I've been a big fan of ambient and experimental music for many years, and this collection really captures the essence of that style. There's something about the ethereal quality of the sounds that just transports me to another place. It's like nothing I've ever heard before.
If you're looking for something new and inspiring to add to your musical arsenal, I urge you to check out the Planetariyum Base collection.",
kind: "", route: nil, runtime: 10000)
story2_cover_blob = story2.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/robot5.png')), filename: 'robot5.png')

story3 = Publication.create(title: "About The Creator",
body: "Elliot Mangini is a developer who is taking the world of web development by storm. Known for his maiden work with Ruby on Rails and React. Mangini is also the creator of Planetariyum, a social platform for artists to collaborate and share their work. He is currently working on the development of the site, and he welcomes feedback from anyone who is interested in helping him out. Mangini is a developer who is pushing the boundaries of web development, and he is sure to make a name for himself in the industry!",
kind: "", route: nil, runtime: 10000)
story3_cover_blob = story3.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/robot4.png')), filename: 'robot4.png')


story5 = Publication.create(title: "Web 3.0 Integration",
body: "Planetariyum is a social network that rewards artists for their work. The network uses a combination of web3 and NFTs to ensure that artists are paid fairly.

Web3 is a platform for building decentralized applications. It enables users to send and receive payments, store data, and more. NFTs are a type of digital asset that can be used to store information.

To pay artists, Planetariyum uses web3 and NFTs. NFTs are automatically minted and held in the Planetariyum Wallet until they are transfered to users. This ensures that artists are paid fairly and that their work is stored securely.

The bulk of this feature will be coming soon. Elliot is currently finishing a Solidity bootcamp and once he is done, the feature will be ready to be implemented.",
kind: "", route: nil, runtime: 10000)
story5_cover_blob = story5.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/robot3.png')), filename: 'robot3.png')

story4 = Publication.create(title: "Limited Time Invite Offer",
body: "Planetariyum is a social network that is currently in development. The site is being created by Big Sister, and will initially be invite-only. Once the site is up and running, existing users will be able to invite their friends. Inviters and invitees will be rewarded with Planetariyum Credits. The goal of the site is to create a safe place for people to connect with each other.

The site will have a number of features, including a newsfeed, a messaging system, and a way to connect with other users. The site will also have a points system, which will allow users to earn rewards for their activity on the site. The more active a user is, the more credits they will earn. ",
kind: "large", route: nil, runtime: 10000)
story4_cover_blob = story4.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/robot2.png')), filename: 'robot2.png')

story6 = Publication.create(title: "Reach Out (and Hire Me)",
body: "Founder and lead developer of Planetariyum, Elliot Mangini, is no stranger to the music industry and is excited to be rolling out his first full-featured web app.

Hiring Mangini is a great idea for any company that wants to improve its online presence. His experience and knowledge in the field of social media and online marketing is second to none (okay, some), and he has a proven track record of success. Mangini is a true asset to any team, and his skills and abilities will undoubtedly help any project to reach new heights.",
kind: "", route: nil, runtime: 10000)
story6_cover_blob = story6.cover_image.attach(io: File.open(File.join(Rails.root,'/app/assets/publications/robot1.png')), filename: 'robot1.png')



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

puts 'Creating Collections 🗂 🗂 🗂'
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
yumBase_card_back_blob = yumBase.card_back.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/card_back_design.png')), filename: 'card_back_design.png')
yumBase_arena_art_blob = yumBase.arena_art.attach(io: File.open(File.join(Rails.root,'/app/assets/collections/base_arena_bkg.png')), filename: 'base_arena_bkg.png')

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

art_array = ["NMT_Card_Art.png", "MetalPopcorn_Card_Art.png", "SquidPortal_Card_Art.png", "Remnant_Card_Art.png", "Midterm_Card_Art.png"]
card_hash = [
    {"Midterm_Card_Art.png" => "Big_Sister_Snare_Midterm_04.wav"},
    {"NMT_Card_Art.png" => "Big_Sister_Snare_NMT_02.wav"},
    {"MetalPopcorn_Card_Art.png" => "Big_Sister_Snare_MetalPopcorn_05.wav"},
    {"SquidPortal_Card_Art.png" => "Big_Sister_Snare_Clap_Squid_01.wav"},
    {"Remnant_Card_Art.png" => "Big_Sister_Snare_Clap_Remnants_04.wav"},

    {"THROEDE_Card_Art.png" => "Big_Sister_Bass_Hit_Throede_01.wav"},
    {"Sentry_Card_Art.png" => "Big_Sister_Impact_Sentry_01.wav"},
    {"KSW_Card_Art.png" => "Big_Sister_Impact_KSW_01.wav"},
    {"NASAInfo_Card_Art.png" => "Big_Sister_FX_NASAinfo_01.wav"},
    {"Diver_Card_Art.png" => "Big_Sister_FX_Diver_01.wav"},
    ]

100.times do |i|
    yumBase_card = elliot.cards.create(
        # chosen_count: DEFAULTS TO 0
        collection_id: yumBase.id,
        name: "card #{i}",
        asset_kind: 'kick',
        file_name: 'Big_Sister_Kick_Geef_01.wav',
        variant: '1'
    )
    random_sample = card_hash.sample
    # key = random_sample
    art_blob = yumBase_card.card_art.attach(io: File.open(File.join(Rails.root,"/app/assets/cards/card_arts/" + random_sample.keys[0])), filename: random_sample.keys[0])
    asset_blob = yumBase_card.card_asset.attach(io: File.open(File.join(Rails.root,"/app/assets/cards/card_assets/" + random_sample.values[0])), filename: random_sample.values[0])

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