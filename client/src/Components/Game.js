import { useParams } from 'react-router-dom';
import Lobby from './Lobby';




export default function Game () {
    const { gameType , gameURL } = useParams();
    console.log({ gameType , gameURL });
  

    return (
        <>
            <div>Game Goes Here</div>
            <Lobby />
        </>
    )
}