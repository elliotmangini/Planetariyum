import Card from './Card';
import { v4 as uuid } from 'uuid';



export default function CardList ({ currentGame }) {
    console.log(currentGame)

    const cardsToRender = currentGame.nfts.map((n) => {
        return (
            <Card nft={n} key={uuid()} />
        )
    })

    return (
        <>
            {cardsToRender}
        </>
    )
}