



export default function Card ({ nft }) {
    console.log(nft)

    return (
        <>  
            <div>
                <img width="20%" src={nft.card.art_url}/>
                <div>{nft.card.name}</div>
            </div>
        </>
    )
}