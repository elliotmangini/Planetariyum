import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect } from 'react'

import style from '../StyleSheets/Game.module.css'





export default function Game ({ setCurrentGame }) {
    const { gameType , gameURL } = useParams();
    const [ liveGame , setLiveGame ] = useState();
    const [ isStart , setIsStart ] = useState(false);
    const [ turnChange , setTurnChange ] = useState(false);
    const [ stagedPlayers , setStagedPlayers ] = useState(["1", "2"]);
    const [ isGameLoaded , setIsGameLoaded ] = useState(false);
    // console.log({ gameType , gameURL })

    useEffect(() => {
        fetch(`/games/${gameURL}`)
        .then(resp => resp.json())
        .then(data => {
            setCurrentGame(data);
            setIsGameLoaded(true);
            // console.log(data);
        })
    }, [])

    function startGame () {
        fetch(`/nfts/${gameURL}/${stagedPlayers}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //     collection_id: "",
            // }),
        })
        .then(resp => resp.json())
        .then(data => {
            
            setIsStart(true);
        })
    }


  

    return (
        <>
            <div>Game Goes Here</div>
            <Lobby startGame={startGame}/>
            <div className={`${style.loading_screen} ${isGameLoaded ? style.fade_away : null}`}>Loading . . .</div>
        </>
    )
}