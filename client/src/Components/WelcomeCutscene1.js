import { useState , useEffect }from 'react';

import style from '../StyleSheets/WelcomeCutscene.module.css';

import EtherHost from './EtherHost';
import TypewriterText from './TypewriterText';




export default function WelcomeCutscene1 ({ setSceneNumber }) {
    const [ messageNumber , setMessageNumber ] = useState(0);
    const [ messageTrigger , setMessageTrigger ] = useState(false);
    const [ startEnd , setStartEnd ] = useState(true);

    const totalMessages = 3;


    useEffect (() => {
        const initialWait = setTimeout(() => {
            console.log("initial wait")
        }, 11000);
        return clearTimeout(initialWait);
    }, []);


    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log("firing message...");
            if (messageNumber <= totalMessages) {
                setMessageNumber(messageNumber + 1);
                setMessageTrigger(!messageTrigger);
            } else {
                setStartEnd(false);
                setSceneNumber(99);
            }
        }, 7800);
        return () => {
            clearTimeout(timeout);
        }
    }, [messageTrigger]);





    return (
        <>
            <div className={ startEnd ? style.fade_in : style.fade_out}>

                <div className='code-text center-vertical'>
                    <div className={style.ether_text_position}>
                        { messageNumber === 1 ? <TypewriterText speed={600} 
                        body={"Hmmmm...             let me see..."}
                        /> : null }
                    </div>
                </div>

                <div className='code-text center-vertical'>
                    <div className={style.ether_text_position}>
                        { messageNumber === 2 ? <TypewriterText speed={300} 
                        body={"I know we have something around here..."}
                        /> : null }
                    </div>
                </div>

                <div className='code-text center-vertical'>
                    <div className={style.ether_text_position}>
                        { messageNumber === 3 ? <TypewriterText speed={500} 
                        body={"Oh shit, someone is here."}
                        /> : null }
                    </div>
                </div>

                <div className='code-text center-vertical'>
                    <div className={style.ether_text_position}>
                        { messageNumber === 4 ? <TypewriterText speed={500} 
                        body={"Oh--       By the way I'm Sophie! Nice to  meet you :)"}
                        /> : null }
                    </div>
                </div>

                <div className='code-text center-vertical'>
                    <div className={style.ether_text_position}>
                        { messageNumber === 5 ? <TypewriterText speed={500} 
                        body={"Anyway, let's show you around!!"}
                        /> : null }
                    </div>
                </div>

                <div className='bobbing center-vertical'>
                    <EtherHost delay={1000}/>
                </div>
            </div>
        </>
    )
}