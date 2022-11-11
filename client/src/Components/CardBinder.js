import BinderCard from './BinderCard';
import { v4 as uuid } from 'uuid';
import style from '../StyleSheets/Game.module.css'
import { useState } from 'react';




export default function CardBinder ({ user, selectedCard, isTurnEnding, setSelectedCard, currentGame, remainingTurns }) {
    const [ lastSelected , setLastSelected ] = useState({});

    // console.log(leftInPack())

    function handleSelect (nft) {
        setLastSelected(selectedCard);
        setSelectedCard(nft);
    }




    const claimedCards = currentGame.nfts.filter((nft) => {
        // console.log(nft);
        // console.log(user.id);
        if ( nft.owner !== null ) {
        return ( nft.owner.id === user.id )
        }
    })

    // const filteredCollections = collections.filter((collection) => {
    //     return (
    //         collection.name.toLowerCase().includes(query.toLowerCase()) || 
    //         collection.creator.display_name.toLowerCase().includes(query.toLowerCase())
    //     )
        
    // })


    const cardsToRender = claimedCards.map((n) => {
        // console.log(n);
        return (
            <BinderCard nft={n} isTurnEnding={isTurnEnding} lastSelected={lastSelected} handleSelect={handleSelect} selectedCard={selectedCard} key={uuid()} />
        )
    })

    return (
        <>
            <div className={`${style.binder_cards_container}`}>
                {cardsToRender}
            </div>
        </>
    )
}