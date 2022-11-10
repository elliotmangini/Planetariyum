import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect } from 'react'

import CardList from './CardList';

import style from '../StyleSheets/Game.module.css'





export default function Game ({ setCurrentGame , currentGame, user }) {
    const { gameType , gameURL } = useParams();
    const [ liveGame , setLiveGame ] = useState();
    const [ isStart , setIsStart ] = useState(false);
    const [ turnChange , setTurnChange ] = useState(false);
    const [ stagedPlayers , setStagedPlayers ] = useState(["1"]);
    const [ isGameLoaded , setIsGameLoaded ] = useState(false);
    const [ cardsInGame , setCardsInGame ] = useState(null);
    const [ selectedCard , setSelectedCard ] = useState({});
    const [ remainingTurns , setRemainingTurns ] = useState();
    // console.log({ gameType , gameURL })

    // CALCULATE REMAINING TURNS
    function calculateRemainingTurns () {
        // deck size minus all nfts that already have an owner
    }

    // GET GAME WHEN WE RELOAD PAGE
    useEffect(() => {
        fetch(`/games/${gameURL}`)
        .then(resp => resp.json())
        .then(data => {
            setCurrentGame(data);
            // console.log(data);
            setIsGameLoaded(true);
            setRemainingTurns(data.deck_size)
        })
    }, [])
    
    // GET GAME WHEN GAME STARTS
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
            setCurrentGame(data);
            // console.log(data);
            setRemainingTurns(data.deck_size)
            setIsStart(true);
        })
    }

    function handleSubmitTurn () {
        
        // fetch(`/nfts/claim/${selectedCard.id}/${user.id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     // body: JSON.stringify({
        //         //     collection_id: "",
        //         // }),
        //     })
        //     .then(resp => resp.json())
        //     .then(data => {
        //     setCurrentGame(data);
        //     setRemainingTurns(data.deck_size)
        //     setSelectedCard({});
        // })
    }



    return (
        <>
            <div>Game Goes Here</div>
            <Lobby startGame={startGame}/>

            { currentGame ?
            <div className={style.game_container}>
                <div className={style.position_cardlist}>
                    <CardList remainingTurns={remainingTurns} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                </div>
                
                <div onClick={handleSubmitTurn} className={`${style.finalize_turn_button} ${Object.keys(selectedCard).length === 0 ? style.turn_unfinishable : null}`}>Finalize<br />Turn</div>
                
            </div>
            : null }

            <div className={`${style.loading_screen} ${isGameLoaded ? style.fade_away : null}`}>Loading . . .</div>
        </>
    )
}