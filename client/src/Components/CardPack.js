import Card from './Card';
import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Game.module.css'
import { useState } from 'react';




export default function CardPack ({ isDeckStack, selectedCard, isTurnEnding, setSelectedCard, currentGame, remainingTurns }) {
    const [ lastSelected , setLastSelected ] = useState({});

    function leftInPack () {
        let modulus = remainingTurns % 5;
        if (remainingTurns === 0) {
            // GAME IS OVER
        } else if (modulus === 0) {
            return 5;
        } else {
            return modulus;
        }
    }

    function handleSelect (nft) {
        setLastSelected(selectedCard);
        setSelectedCard(nft);
    }

    const remainingCards = currentGame.nfts.filter((nft) => {
        return ( nft.owner === null)
    })

    // const filteredCollections = collections.filter((collection) => {
    //     return (
    //         collection.name.toLowerCase().includes(query.toLowerCase()) || 
    //         collection.creator.display_name.toLowerCase().includes(query.toLowerCase())
    //     )
        
    // })


    const cardsToRender = remainingCards.slice(0, leftInPack()).map((n) => {
        // console.log(n);
        return (
            <Card isDeckStack={isDeckStack} nft={n} isTurnEnding={isTurnEnding} lastSelected={lastSelected} handleSelect={handleSelect} selectedCard={selectedCard} key={uuid()} />
        )
    })

    return (
        <>
            <div className={`${style.cards_container} ${true ? style.add_snappy_fade_in : null} ${isTurnEnding ? style.add_small_and_fade : null}`}>
                {cardsToRender}
            </div>
        </>
    )
}