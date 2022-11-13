import style from '../StyleSheets/WelcomeCutscene.module.css';
import { useState, useEffect } from 'react';

import WelcomeCutscene1 from './WelcomeCutscene1';
import WelcomeCutscene2 from './WelcomeCutscene2';
import WelcomeCutscene3 from './WelcomeCutscene3';
import WelcomeCutscene4 from './WelcomeCutscene4';
import WelcomeCutscene5 from './WelcomeCutscene5';






export default function WelcomeCutscene () {
    const [ sceneNumber , setSceneNumber ] = useState(1);


    function findScene () {
        switch(sceneNumber) {
            case 1:
                return ( <WelcomeCutscene1 /> )
            case 2:
                return ( <WelcomeCutscene2 /> )
            case 3:
                return ( <WelcomeCutscene3 /> )
            case 4:
                return ( <WelcomeCutscene4 /> )
            case 5:
                return ( <WelcomeCutscene5 /> )
                 
            default:
                return ( <></> )
        }
    }

    useEffect(() => {
        findScene();
    }, [sceneNumber])

    const scene = findScene();


    return (
        <div id={style.give_absolute_fullscreen}>
            {scene}
        </div>
    )
}