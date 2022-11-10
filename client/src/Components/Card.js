import style from '../StyleSheets/Game.module.css'
// import { useState } from 'react';



export default function Card ({ nft, selectedCard, isTurnEnding, lastSelected, handleSelect }) {
    // console.log(nft)

    // add set down to selected card only

    // function hit () {
    //     console.log("hit!");
    //     return style.add_flip_facedown;
    // }


    return (
        <>  
                <div className={`${style.flip_card}`}>
                    <div className={`${style.flip_card_inner} ${!selectedCard.id && !isTurnEnding ? style.add_flip_reveal : style.no_flip} ${isTurnEnding ? style.add_flip_facedown : null}`}>
                        <div className={`${style.flip_card_front}`}>
                            <img onClick={() => handleSelect(nft)} className={`${style.image_sizing_selectable} ${selectedCard.id === nft.id ? style.selected_unhoverable : style.unselected_hoverable} ${lastSelected.id === nft.id ? style.set_down : null } ${selectedCard.id === nft.id && isTurnEnding ? style.set_selected_down : null}`} src={nft.card.art_url} alt="Avatar" />
                        </div>
                        <div className={`${style.flip_card_back}`}>
                            <img className={`${style.image_sizing_selectable}`} src={nft.card.collection_card_back_url} alt="Avatar" />
                        </div>
                    </div>
                </div>
        </>
    )
}