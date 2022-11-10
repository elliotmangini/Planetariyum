import style from '../StyleSheets/Game.module.css'
// import { useState } from 'react';



export default function Card ({ nft, selectedCard, lastSelected, handleSelect }) {
    // console.log(nft)



    // function claimCard () {

    // }

    return (
        <>  
                <div className={`${style.flip_card}`}>
                    <div className={`${style.flip_card_inner} ${!selectedCard.id ? style.add_flip : style.no_flip}`}>
                        <div className={`${style.flip_card_front}`}>
                            <img onClick={() => handleSelect(nft)} className={`${style.image_sizing_selectable} ${selectedCard.id === nft.id ? style.selected_unhoverable : style.unselected_hoverable} ${lastSelected.id === nft.id ? style.set_down : null }`} src={nft.card.art_url} alt="Avatar" />
                        </div>
                        <div className={`${style.flip_card_back}`}>
                            <img className={`${style.image_sizing_selectable}`} src={nft.card.collection_card_back_url} alt="Avatar" />
                        </div>
                    </div>
                </div>
        </>
    )
}