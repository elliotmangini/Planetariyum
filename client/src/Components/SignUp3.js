import React, { useState, useEffect } from "react";
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

import WelcomeCutscene from './WelcomeCutscenes';





export default function SignUp3 ({ setCurrentGame, dimUI, setDimUI, setSequence, user, setUser }) {
    const [ isWelcomeEnding , setIsWelcomeEnding ] = useState(false);
    const [ startCutscene , setStartCutscene] = useState(false);

    useEffect(() => {
        setDimUI("opacity_25");
        setCurrentGame(null);
    },[])

    function handleCollectionRecommendation () {
        setDimUI("opacity_0")
        setIsWelcomeEnding(true);
        setTimeout(() => {
            setStartCutscene(true);
        }, 4000)
    }

    return (
        <>
            <div className={"pop-up-container " + `${ isWelcomeEnding ? style.add_slow_fade : null}`}>
                <div className={style.avatar_title_container}>
                    <img className={style.avatar_title_bubble} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                </div>
                <div className="pop-up-title"><span>{user.display_name}, huh? ...Okay,<br />Wouldn't have been my first choice! but--</span></div>
                {/* <div>Have a Draft on us?</div> */}
                    {/* <div className={style.smol}>There'll be time to explore soon, but we'd like to show you the game and start your collection first.</div> */}
                    <div>We'd like to recommend a curated set...</div>
                <div className={style.text_body_container}>
                </div>
                <div className={style.moods_container}>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Heady}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Modern2}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Organic}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Prismatic}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Cinematic}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Spooky}></img>
                    </div>
                    <div></div>
                    <div className={style.mood_container}>
                        <img onClick={handleCollectionRecommendation} className={style.mood_thumb} src={Notsure}></img>
                    </div>
                </div>

            <div className="pop-up-title"><span>What's your vibe?</span></div>
            </div>


            { startCutscene ?
                <WelcomeCutscene user={user} />
            : null}
        </>
    )
}