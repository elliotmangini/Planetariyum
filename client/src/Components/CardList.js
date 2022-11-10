import Card from './Card';
import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Game.module.css'
import { useState } from 'react';




export default function CardList ({ currentGame }) {
    const [ selectedCard , setSelectedCard ] = useState({});
    const [ lastSelected , setLastSelected ] = useState({});
    // console.log(currentGame)

    function handleSelect (nft) {
        setLastSelected(selectedCard);
        setSelectedCard(nft);
    }

    const cardsToRender = currentGame.nfts.map((n) => {
        // console.log(n);
        return (
            <Card nft={n} lastSelected={lastSelected} handleSelect={handleSelect} selectedCard={selectedCard} key={uuid()} />
        )
    })

    return (
        <>
            <div className={style.cards_container}>
                {cardsToRender}
            </div>
        </>
    )
}