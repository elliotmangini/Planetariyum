import style from '../StyleSheets/Game.module.css'
// import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import {useEffect, useState, useRef} from 'react';


export default function Card ({ isDeckStack, nft, selectedCard, isTurnEnding, lastSelected, handleSelect }) {
    const [ audioAction , setAudioAction ] = useState("");
    const [ duration , setDuration ] = useState(100000);
    const [ isManualFlip , setIsManualFlip ] = useState(false);
    // const [ wasJustSetDown , setWasJustSetDown ] = useState(false);
    const renderCount = useRef(1);
    // console.log(`CARD COMPONENT: ${nft.card.name} ID: ${nft.card.id}`);
    // console.log("States:")
    // console.log({
    //     audioAction,
    //     duration,
    //     isManualFlip,
    // });
    // console.log("Props:")
    // console.log({
    //     nft,
    //     selectedCard,
    //     isTurnEnding,
    //     lastSelected,
    // });

    // useEffect(() => {
    //     if (!selectedCard.id && !isTurnEnding) {
    //         setWasJustSetDown(true);
    //     } else {
    //         setWasJustSetDown(false);
    //     }
    // }, [isDeckStack]);

    useEffect(() => {
        // TWO RENDERS ON A PLAY IS NORMAL CAUSE WE PLAY AND THEN CLEAR THE PLAY ACTION SO THAT WE CAN PLAY MULTIPLE TIMES
        // console.log(`CARD COMPONENT: ${nft.card.name} ID: ${nft.card.id}`);
        // console.log(renderCount.current);
        renderCount.current = renderCount.current + 1
    })

    
    // console.log(duration);
    function handleClick () {
        setAudioAction("play");
        // console.log("click to play");

        // SLIGHTLY CONFUSED WHY WE NEED TO WAIT 1MS TO GET IT TO PLAY BUT I KNEW WHY AT ONE POINT
        const timer = setTimeout(() => {
            if (!(selectedCard.id === nft.id)) {
                handleSelect(nft)
            }
            // THIS ALLOWS MULTIPLE PLAYS WETHER WE NEED TO SET A HIGHER LEVEL STATE OR NOT
            setAudioAction("");
        }, 1
        );
        return () => clearTimeout(timer);
    }

    // THIS DOESNT WORK BUT DOESNT BREAK EITHER
    function forceflip () {
        console.log("checking");
        setIsManualFlip(true);
    }

    // console.log(audioAction)
    // ${audioAction === "play" ? style.add_play_animation : null}


    return (
        <>  
                {/* THIS DEFFFFFINITELY HELPED, THE IMAGE IS CROPPED TO A TRANSPARENT PORTION 10PX WIDE AND SEEMS LIKE IT MUST BE ONNN SCREEN TO HELP */}
                <div className='prerender-off-screen'>
                    <img src={nft.card.art_url} alt="prerender" />
                </div>
                

                <div className={`${style.flip_card}`}>
                    <div className={
                        `${style.flip_card_inner} 
                        ${((!selectedCard.id && !isTurnEnding) || isManualFlip) && renderCount.current === 1 ? style.add_flip_reveal : style.no_flip} 
                        ${isTurnEnding ? style.add_flip_facedown : null}`}>
                        <div className={`${style.flip_card_front}`}>
                            <img onClick={!isTurnEnding ? () => handleClick() : null} className={
                                `${style.image_sizing_selectable} 

                                // THE PROBLEM HERE IS WHEN BOTH ARE FALSE IT RETURNS TRUE
                                // IS THIS CARD SELECTED? |
                                // WE NEED FALSE FALSE TO RETURN something unhoverable
                                // ${(selectedCard.id === nft.id) && !isTurnEnding ? style.selected_unhoverable : style.unselected_hoverable} 

                                // HOLY FUCK IT WORKS
                                ${!isTurnEnding ? 
                                    ((selectedCard.id === nft.id) ? style.selected_unhoverable : style.unselected_hoverable)
                                    : ((selectedCard.id === nft.id) ? style.selected_unhoverable : style.unselected_unhoverable)
                                } 
                                
                                // ${(selectedCard.id === nft.id) && isTurnEnding ? style.selected_unhoverable : null} 

                                ${(lastSelected.id === nft.id) && !isTurnEnding ? style.set_down : null } 
                                ${selectedCard.id === nft.id && isTurnEnding ? style.set_selected_down : null}`} 
                                src={nft.card.art_url} alt="Avatar" />
                        </div>
                        <div className={`${style.flip_card_back}`}>
                            <img onClick={forceflip} className={`${style.image_sizing_selectable}`} src={nft.card.collection_card_back_url} alt="Avatar" />
                        </div>
                    </div>
                </div>

                {audioAction ? <AudioPlayer setDuration={setDuration} action={audioAction} clearAction={setAudioAction}  sound={nft.card.asset_url} /> : null }
        </>
    )
}