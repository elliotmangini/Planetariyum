import { useState } from 'react';
import { Navigate } from 'react-router-dom';

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
    const [ isWelcomeEnding , setIsWelcomeEnding ] = useState(false);
    const [ isRedirect , setIsRedirect ] = useState(false);

    function handleCollectionRecommendation () {
        setIsWelcomeEnding(true);
        setTimeout(() => {
            createGame();
        }, 5000)
    }
    
    // const forceCollection = 1
    function createGame () {
        const gameObj = {
            collection_id: 1,
            deadline: "03 Feb 2023 04:05:06 +0000",
            local_url: `welcome_${user.username}`,
            game_type: "draft",
            deck_size: 50,
        }
        fetch("/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gameObj),
        })
        .then(resp => resp.json())
        .then(() => {
            setIsRedirect(true);
        })
    }

    return (
        <>
            <div className={"pop-up-container " + `${ isWelcomeEnding ? style.add_slow_fade : null}`}>
                <div className={style.avatar_title_container}>
                    <img className={style.avatar_title_bubble} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                </div>
                <div className="pop-up-title">Have a Draft on us, {user.display_name} ?</div>
                <div className={style.text_body_container}>
                    <div>There'll be time to explore soon, but we'd like to show you the game and start your collection first.</div>
                    <div>We'd like to recommend a curated set...</div>
                    <div>What kind of sounds would you like to draft from?</div>
                </div>
                <div className={style.moods_container}>
                    <div></div>
                    <div className={style.mood_container}>
                        Heady
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Heady}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        Prismatic
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Modern2}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        Organic
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Organic}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        Techy
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Prismatic}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        Cinematic
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Cinematic}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        Spooky
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Spooky}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        Not Sure
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Notsure}></img>
                    </div>
                </div>
            </div>



            { isRedirect ? <Navigate to={`/play/draft/welcome_${user.username}`} /> : null}
        </>
    )
}