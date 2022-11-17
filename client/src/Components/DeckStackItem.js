import style from '../StyleSheets/DeckStack.module.css'
// import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import {useState} from 'react';


export default function DeckStackItem ({ nft, selectedCard, isTurnEnding, lastSelected, handleSelect }) {
    const [ audioAction , setAudioAction ] = useState("");
    const [ duration , setDuration ] = useState(100000);
    // console.log(nft)

    
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


    return (
        <> 
                <div className={style.crop_container}>
                    <div></div>
                    <img onClick={handleClick} className={`${style.card_image_sliver}`} src={nft.card.art_url} alt="Avatar" />
                </div>

                {audioAction ? <AudioPlayer setDuration={setDuration} action={audioAction} clearAction={setAudioAction}  sound={nft.card.asset_url} /> : null }
        </>
    )
}