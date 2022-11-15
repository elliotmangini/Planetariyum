import Card from './Card';
import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Game.module.css'
import { useState } from 'react';




export default function CardPack ({ isDeckStack, selectedCard, isTurnEnding, setSelectedCard, currentGame, cardsInPack }) {
    const [ lastSelected , setLastSelected ] = useState({});

    // console.log(cardsInPack);

    const unclaimedCards = cardsInPack.filter(card => {
        return (card.owner === null)
    })

    // console.log(unclaimedCards);


    const cardsToRender = unclaimedCards.map((n) => {
        // console.log(n);
        return (
            <Card isDeckStack={isDeckStack} nft={n} isTurnEnding={isTurnEnding} lastSelected={lastSelected} handleSelect={handleSelect} selectedCard={selectedCard} key={uuid()} />
        )
    })

    function handleSelect (nft) {
        setLastSelected(selectedCard);
        setSelectedCard(nft);
    }

    return (
        <>
            <div className={`${style.cards_container} ${true ? style.add_snappy_fade_in : null} ${isTurnEnding ? style.add_small_and_fade : null}`}>
                {cardsToRender}
            </div>
        </>
    )
}