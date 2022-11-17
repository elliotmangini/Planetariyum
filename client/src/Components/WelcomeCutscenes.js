import style from '../StyleSheets/WelcomeCutscene.module.css';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


import AudioPlayer from './AudioPlayer';

import WelcomeTheme from '../Assets/audio/welcome_cutscene/welcome_theme.wav'


import WelcomeCutscene1 from './WelcomeCutscene1';
import WelcomeCutscene2 from './WelcomeCutscene2';
import WelcomeCutscene3 from './WelcomeCutscene3';
import WelcomeCutscene4 from './WelcomeCutscene4';
import WelcomeCutscene5 from './WelcomeCutscene5';






export default function WelcomeCutscene ({ user }) {
    const [ sceneNumber , setSceneNumber ] = useState(1);
    const [ isRedirect , setIsRedirect ] = useState(false);

    console.log({
        sceneNumber,
        isRedirect,
    })



    // const forceCollection = 1
    function createGame () {
        const gameObj = {
            collection_id: 1,
            deadline: "03 Feb 2023 04:05:06 +0000",
            local_url: `welcome_${user.username}`,
            game_type: "Welcome",
            deck_size: 15,
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



    function findScene () {
        switch(sceneNumber) {
            case 1:
                return ( <WelcomeCutscene1 setSceneNumber={setSceneNumber}/> )
            case 2:
                return ( <WelcomeCutscene2 /> )
            case 3:
                return ( <WelcomeCutscene3 /> )
            case 4:
                return ( <WelcomeCutscene4 /> )
            case 5:
                return ( <WelcomeCutscene5 /> )

            case 99:
                return createGame();
                 
            default:
                return ( <></> )
        }
    }

    useEffect(() => {
        findScene();
    }, [sceneNumber])

    const scene = findScene();


    return (
        <>

            <div id={style.give_absolute_fullscreen}>
                {scene}
            </div>

            {sceneNumber === 1 ?
                <AudioPlayer action={"play"} sound={WelcomeTheme} />
                : null}
            
            { isRedirect ? <Navigate to={`/play/welcome/welcome_${user.username}`} /> : null}
        </>
    )
}