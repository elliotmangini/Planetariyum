import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect } from 'react'

import CardPack from './CardPack';
import CardBinder from './CardBinder';
import DeckStack from './DeckStack';


import style from '../StyleSheets/Game.module.css'

import playerCamp from '../Assets/gamepieces/gamepiece_playercamp.png'
import AvatarFrame from '../Assets/gamepieces/avatar_frame.png'
import TurnCounter from '../Assets/gamepieces/turn_counter.png'
import GlowIndicator from './GlowIndicator';






export default function Game ({ setCurrentGame , currentGame, user }) {
    const { gameType , gameURL } = useParams();
    const [ isStart , setIsStart ] = useState(false);
    const [ turnChange , setTurnChange ] = useState(false);
    const [ stagedPlayers , setStagedPlayers ] = useState(["1"]);
    const [ isGameLoaded , setIsGameLoaded ] = useState(false);
    const [ cardsInGame , setCardsInGame ] = useState(null);
    const [ selectedCard , setSelectedCard ] = useState({});
    const [ remainingTurns , setRemainingTurns ] = useState();
    const [ isTurnEnding , setIsTurnEnding ] = useState(false);
    const [ spinReset , setSpinReset ] = useState(false);
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

    // function failSpin () {
    //     console.log(" in failspin setting true")
    //     setSpinReset(true);
    // }

    function handleSubmitTurn () {
        // failSpin();

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
            <img className={style.arena_background} src={currentGame ? currentGame.collection.arena_art_url : null}></img>
            { isGameLoaded && user ?
            <>
                { currentGame.nfts.length === 0 ?
                    <Lobby startGame={startGame}/>
                : null }

                { currentGame.nfts.length > 0 ?
                <div onClick={() => console.log("clicking game container")} className={style.game_container}>

                    {/* SETTINGS */}
                    <div className={style.settings_box}></div>

                    {/* PLAYER CAMP */}
                    <div id={style.playercamp_positioning_container}>
                        <div id={style.playercamp_image_container}>
                            {/* SHADOW */}
                            <div id={style.playercamp_shadow}></div>

                            {/* AVATAR */}
                            <div id={style.avatar_frame_positioning_container}>
                                <div id={style.avatar_frame_image_container}>
                                    {/* <div id={style.playercamp_shadow}></div> */}
                                    <img id={style.avatar_image} src={user.avatar_url}/>
                                    <img id={style.avatar_frame_image} src={AvatarFrame}/>
                                </div>
                            </div>

                            {/* TURN COUNTER */}
                            {/* <div onClick={handleSubmitTurn} className={`${style.finalize_turn_button} ${Object.keys(selectedCard).length === 0 ? style.turn_unfinishable : null}`}>Finalize<br />Turn</div> */}
                            <div id={style.turn_counter_positioning_container}>
                                <div id={style.turn_counter_image_container}>
                                    {/* <div id={style.playercamp_shadow}></div> */}
                                    <img id={style.avatar_image} src={user.avatar_url}/>
                                    <img id={style.turn_counter_image} className={ isTurnEnding ? style.add_spin : null } src={TurnCounter}/>
                                    <div id={style.turn_clickable} onClick={handleSubmitTurn} className={Object.keys(selectedCard).length > 0 ? style.turn_glow : null}>
                                        { selectedCard && !isTurnEnding ? <GlowIndicator /> : null}
                                    </div>
                                </div>
                            </div>

                            {/* SHADOW */}
                            <div id={style.playercamp_shadow}></div>
                            
                            {/* CAMP */}
                            <img id={style.playercamp_image} src={playerCamp}/>
                        </div>
                    </div>

                    {/* DECKSTACK */}
                    <div className={style.deckstack_positioning}>
                        <div></div>
                        <DeckStack user={user} remainingTurns={remainingTurns} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                    </div>
                    
                    {/* PACKS */}
                    <div className={style.position_cardlist}>
                        <CardPack remainingTurns={remainingTurns} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                    </div>
                    
                    {/* BIG CARD */}
                    { Object.keys(selectedCard).length > 0 ?
                    <div className={style.big_card_container}>
                        <img className={`${style.big_card_image} ${isTurnEnding ? style.add_off_stage_left : null}`} src={selectedCard.card.art_url} alt="Big Card" />
                    </div>
                    : null }
                    
                    
                </div>
                : null }
            </>
            : null }

            <div className={`${style.loading_screen} ${isGameLoaded ? style.transition_fade : null}`}>Loading . . .</div>
        </div>
    )
}