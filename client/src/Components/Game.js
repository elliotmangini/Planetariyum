import { useParams } from 'react-router-dom';




export default function Game () {
    const { gameType , gameURL } = useParams();
    console.log({ gameType , gameURL });
  

    return (
        <>
            <div>Game Goes Here</div>
        </>
    )
}