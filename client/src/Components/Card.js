import style from '../StyleSheets/Game.module.css'
// import { useState } from 'react';



export default function Card ({ nft, selectedCard, lastSelected, handleSelect }) {
    // console.log(nft)



    // function claimCard () {

    // }

    return (
        <>  
            {/* <div className={`${style.card_outer_container} ${selectedCard.id === nft.id ? style.unhoverable : style.hoverable} ${lastSelected.id === nft.id ? style.set_down : null }`}> */}
                {/* <div className={style.flip_card}>
                    <div onClick={() => handleSelect(nft)} className={`${style.card_inner_container} ${selectedCard.id === nft.id ? style.selected : null}`}>
                        <div className={style.flip_card_front}>
                            <img className={style.card_image} src={nft.card.art_url}/>
                        </div>
                        <div className={style.flip_card_back}>
                            <img className={style.card_back} src={nft.card.collection_card_back_url}></img>
                        </div>

                        <div className={style.card_absolute_overlay}>{nft.card.name}</div>
                    </div>
                </div> */}
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
            {/* </div> */}
        </>
    )
}