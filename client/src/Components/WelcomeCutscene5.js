import style from '../StyleSheets/WelcomeCutscene.module.css';

import FaultyNeon from './FaultyNeon';



export default function WelcomeCutscene5 () {

    return (
        <>
            <div className={style.delayed_fade_in}>
                <FaultyNeon />
            </div>
        </>
    )
}