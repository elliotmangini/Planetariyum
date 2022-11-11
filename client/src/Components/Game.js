import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect } from 'react'

import CardList from './CardPack';
import CardBinder from './CardBinder';


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
    const [ isTurnEnding , setIsTurnEnding ] = useState(false);
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
            headers: { "Content-Type": "application/json" },
            })
            .then(resp => resp.json())
            .then(data => {
            setCurrentGame(data);
            setRemainingTurns(data.deck_size)
            setIsStart(true);
        })
    }

    function handleSubmitTurn () {

        if (Object.keys(selectedCard).length !== 0 && user) {
            setIsTurnEnding(true);
            fetch(`/nfts/claim/${selectedCard.id}/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                })
                .then(resp => resp.json())
                .then(data => {
                    const timer = setTimeout(() => {
                        setSelectedCard({});
                        setCurrentGame(data);
                        setRemainingTurns(data.deck_size);
                        setIsTurnEnding(false);
                      }, 3700
                    );
                    return () => clearTimeout(timer);
                })
        } else {
            // HANDLE THIS ERROR
        }
    }



    return (
        <div className={style.give_game_fullscreen}>
            { isGameLoaded && user ?
            <>
                { currentGame.nfts.length === 0 ?
                    <Lobby startGame={startGame}/>
                : null }

                { currentGame.nfts.length > 0 ?
                <div className={style.game_container}>

                    <div className={style.binder_container}>
                        <CardBinder user={user} remainingTurns={remainingTurns} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                    </div>

                    <div className={style.position_cardlist}>
                        <CardList remainingTurns={remainingTurns} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                    </div>
                    
                    <div onClick={handleSubmitTurn} className={`${style.finalize_turn_button} ${Object.keys(selectedCard).length === 0 ? style.turn_unfinishable : null}`}>Finalize<br />Turn</div>
                    
                </div>
                : null }
            </>
            : null }

            <div className={`${style.loading_screen} ${isGameLoaded ? style.transition_fade : null}`}>Loading . . .</div>
        </div>
    )
}