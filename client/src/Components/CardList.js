import Card from './Card';
import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Game.module.css'
import { useState } from 'react';




export default function CardList ({ selectedCard, setSelectedCard, currentGame, remainingTurns }) {
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

    console.log(leftInPack())

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