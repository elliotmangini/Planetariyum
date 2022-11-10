import style from '../StyleSheets/Game.module.css'
import { useState } from 'react';



export default function Card ({ nft, selectedCard, lastSelected, handleSelect }) {
    // console.log(nft)



    // function claimCard () {

    // }

    return (
        <>  
            <div className={`${style.card_outer_container} ${selectedCard.id === nft.id ? style.unhoverable : style.hoverable} ${lastSelected.id === nft.id ? style.set_down : null }`}>
                <div onClick={() => handleSelect(nft)} className={`${style.card_inner_container} ${selectedCard.id === nft.id ? style.selected : null}`}>
                    <img className={style.card_image} src={nft.card.art_url}/>
                    <div className={style.card_absolute_overlay}>{nft.card.name}</div>
                </div>
            </div>
        </>
    )
}