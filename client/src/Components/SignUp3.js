import style from '../StyleSheets/WelcomeSequence.module.css';

import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';

import Cinematic from '../Assets/vibes/cinematic.png';
import Heady from '../Assets/vibes/heady.png';
import Modern2 from '../Assets/vibes/modern2.png';
import Notsure from '../Assets/vibes/notsure.png';
import Organic from '../Assets/vibes/organic.png';
import Prismatic from '../Assets/vibes/prismatic3.png';
import Spooky from '../Assets/vibes/spooky.png';





export default function SignUp3 ({ setSequence, user, setUser }) {

    return (
        <>
            <div className="pop-up-container">
                <div className={style.avatar_title_container}>
                    <img className={style.avatar_title_bubble} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                </div>
                <div className="pop-up-title">Have a Draft on us, {user.display_name} ?</div>
                <div>There'll be time to explore soon, but we'd like to show you the game and start your collection first.</div>
                <div>We'd like to recommend a curated set...</div>
                <div>What kind of sounds would you like to draft from?</div>
                <div className={style.moods_container}>
                <div className={style.mood_container}>
                    Cinematic
                    <img className={style.mood_thumb} src={Cinematic}></img>
                </div>
                <div className={style.mood_container}>
                    Heady
                    <img className={style.mood_thumb} src={Heady}></img>
                </div>
                <div className={style.mood_container}>
                    Modern
                    <img className={style.mood_thumb} src={Modern2}></img>
                </div>
                <div className={style.mood_container}>
                    Organic
                    <img className={style.mood_thumb} src={Organic}></img>
                </div>
                <div className={style.mood_container}>
                    Prismatic
                    <img className={style.mood_thumb} src={Prismatic}></img>
                </div>
                <div className={style.mood_container}>
                    Spooky
                    <img className={style.mood_thumb} src={Spooky}></img>
                </div>
                <div className={style.mood_container}>
                    Not Sure . . .
                    <img className={style.mood_thumb} src={Notsure}></img>
                </div>
                </div>
            </div>
        </>
    )
}