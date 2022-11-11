import style from '../StyleSheets/Game.module.css'
// import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import {useState} from 'react';


export default function Card ({ nft, selectedCard, isTurnEnding, lastSelected, handleSelect }) {
    const [ audioAction , setAudioAction ] = useState("");
    const [ duration , setDuration ] = useState(100000);
    // console.log(nft)

    
    // console.log(duration);
    function handleClick () {
        setAudioAction("play");
        const timer = setTimeout(() => {
            if (!(selectedCard.id === nft.id)) {
                // console.log(duration);
                handleSelect(nft)
            }
        }, 100
        );
        return () => clearTimeout(timer);
    }


    return (
        <>  
                {/* <div className={`${style.flip_card}`}>
                    <div className={`${style.flip_card_inner} : null}`}>
                        <div className={`${style.binder_card_front}`}>
                            <img className={`${style.image_sizing_selectable}`} src={nft.card.art_url} alt="Avatar" />
                        </div>
                        <div className={`${style.flip_card_back}`}>
                            <img className={`${style.image_sizing_selectable}`} src={nft.card.collection_card_back_url} alt="Avatar" />
                        </div>
                    </div>
                </div> */}

                <img className={`${style.binder_card_image}`} src={nft.card.art_url} alt="Avatar" />

                {audioAction ? <AudioPlayer setDuration={setDuration} action={audioAction} clearAction={setAudioAction}  sound={nft.card.asset_url} /> : null }
        </>
    )
}