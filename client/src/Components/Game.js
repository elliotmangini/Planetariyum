import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect, useRef } from 'react'

import CardPack from './CardPack';
import CardBinder from './CardBinder';
import DeckStack from './DeckStack';


import style from '../StyleSheets/Game.module.css'

import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';
import playerCamp from '../Assets/gamepieces/gamepiece_playercamp.png'
import campCounter1 from '../Assets/gamepieces/playercamp_counter_step1.png'
import AvatarFrame from '../Assets/gamepieces/avatar_frame.png'
import TurnCounter from '../Assets/gamepieces/turn_counter.png'
import GlowIndicator from './GlowIndicator';






export default function Game ({ setCurrentGame , currentGame, user, cable }) {
    const renderCount = useRef(1);
    useEffect(() => {
            console.log("Game Component render count: " + renderCount.current);
            renderCount.current = renderCount.current + 1
    })
    
    // const [ spinReset , setSpinReset ] = useState(false);
    // const [ isStart , setIsStart ] = useState(false);
    const { gameType , gameURL } = useParams();
    const [ stagedPlayers , setStagedPlayers ] = useState(["1,2"]);
    const [ isGameLoaded , setIsGameLoaded ] = useState(false);
    const [ selectedCard , setSelectedCard ] = useState({});
    const [ isTurnEnding , setIsTurnEnding ] = useState(false);
    
    // THIS CAN BE REFACTORED INTO LINEAR TIME
    // const [ claimedCards , setClaimedCards ] = useState([]);

    // STATE LOGGING
    console.log("!!!!!!!!!!! GAME COMPONENT !!!!!!!!!!!");
    console.log({
        user,
        currentGame,
        gameType,
        stagedPlayers,
        isGameLoaded,
        selectedCard,
        isTurnEnding,
    })
    

    // "LINEAR" STATES
    let totalCards;
    let totalTurns;
    let turnsRemaining;
    let turnNumber;
    let packs = [];
    let remainingCards = [];
    let claimedCards = [];
    let opponentsCards = [];
    // LINEAR TIME PACK ORGANIZATION
    if (currentGame) {
        if (currentGame.nfts) {
            totalCards = currentGame.nfts.length;
            totalTurns = totalCards / currentGame.players.length
            
            currentGame.nfts.map((nft) => {
                console.log(nft.id);
                
                if (nft.owner === null) {
                    remainingCards = [...remainingCards, nft];
                } else if (nft.owner.id === user.id ) {
                    claimedCards = [...claimedCards, nft];
                } else {
                    opponentsCards = [...opponentsCards, nft];
                }
            });
        }

        turnsRemaining = totalTurns - remainingCards
    }

    // LINEAR TIME LOG
    console.log({claimedCards , remainingCards, opponentsCards, totalCards, totalTurns, turnNumber});
    
    // GET GAME SPECIFICALLY WHEN WE RELOAD PAGE
    useEffect(() => {fetchGame()}, [user])
    function fetchGame () {
        if (user) {
            fetch(`/games/${gameURL}`)
            .then(resp => resp.json())
            .then(data => {

                setCurrentGame(data);
                setIsGameLoaded(true);
                // findPulls(data.nfts);
                // console.log("Getting game after refresh... or on initial load");
                // console.log(data);
            })
        }
    }
    
    // CREATES NFTS AND SETS GAME IN MOTION
    function startGame () {
        fetch(`/nfts/${gameURL}/${stagedPlayers}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            })
            .then(resp => resp.json())
            .then(data => {
            setCurrentGame(data);
            // setIsStart(true);
        })
    }

    // function failSpin () {
    //     console.log(" in failspin setting true")
    //     setSpinReset(true);
    // }

    function handleSubmitTurn () {
        // failSpin();

        if ((Object.keys(selectedCard).length !== 0 && user)) {
            setIsTurnEnding(true);
            fetch(`/nfts/claim/${selectedCard.id}/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                })
                .then(resp => resp.json())
                .then(data => {
                    const timer = setTimeout(() => {
                        if ( remainingCards.length > 0 ) {
                            setSelectedCard({});
                            setCurrentGame(data);
                            // setIsTurnEnding(false);
                        }
                      }, 3700
                    );
                    return () => clearTimeout(timer);
                })
                .then(() => {
                    fetchUntilTurn();
                })
        } else {
            // HANDLE THIS ERROR
        }
    }

    function fetchUntilTurn () {
        const waitingForPlayers = setTimeout(() => {
            fetchGame();
            // THIS IS WHERE WE NEED TO FIGURE OUT IF THE TURN IS OVER
            if (false) {
                fetchUntilTurn();
            }
        }, 10000);
        return () => clearTimeout(waitingForPlayers);
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
                <div className={style.game_container}>

                    {/* SETTINGS */}
                    <div className={style.settings_box}>

                    {/* unclaimed nfts/unpulled cards count */}
                    {/* currentGame.deck_size * currentGame.players.length */}
                        <div>{currentGame.deck_size - claimedCards.length} pulls left</div>
                        <div>{claimedCards.length === currentGame.deck_size ? 0 : currentGame.players.length * Math.floor(((currentGame.deck_size - claimedCards.length - 1) / 5))} unopened pack(s) left</div>
                    </div>
                    
                    {/* DECKSTACK */}
                    <DeckStack claimedCards={claimedCards} user={user} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>

                    {/* LOWER UI */}
                    <div className={style.playercamp_positioning_container}>
                        <div className={style.playercamp_image_container}>
                            {/* SHADOW */}
                            <div id={style.playercamp_shadow}></div>

                            {/* AVATAR */}
                            <div id={style.avatar_frame_positioning_container}>
                                <div id={style.avatar_frame_image_container}>
                                    {/* <div id={style.playercamp_shadow}></div> */}
                                    <img id={style.avatar_image} src={user.avatar_url ? user.avatar_url : avatarPlaceholder}/>
                                    <img id={style.avatar_frame_image} src={AvatarFrame}/>
                                </div>
                            </div>

                            {/* TURN COUNTER */}
                            {/* <div onClick={handleSubmitTurn} className={`${style.finalize_turn_button} ${Object.keys(selectedCard).length === 0 ? style.turn_unfinishable : null}`}>Finalize<br />Turn</div> */}
                            <div id={style.turn_counter_positioning_container}>
                                <div id={style.turn_counter_image_container}>
                                    {/* <div id={style.playercamp_shadow}></div> */}
                                    {/* FAKING SYMETRICAL SHADOW BY REUSING AVATAR UNDER TURN COUNTER */}
                                    <img id={style.avatar_image} src={avatarPlaceholder}/>
                                    <img id={style.turn_counter_image} className={`${isTurnEnding ? style.add_spin : null }`} src={TurnCounter}/>
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

                    
                    {/* PACKS */}
                    {remainingCards.length > 0 ?
                    <div className={style.position_cardlist}>
                        <CardPack claimedCards={claimedCards} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                    </div>
                    : null }
                    
                    {/* BIG CARD */}
                    { Object.keys(selectedCard).length > 0 ?
                    <div className={style.big_card_container}>
                        <img className={`${style.big_card_image} ${isTurnEnding ? style.add_off_stage_left : null}`} src={selectedCard.card.art_url} alt="Big Card" />
                    </div>
                    : null }

                    {/* NOT HELPING */}
                    {/* {bigCardPrerenders} */}

                    


                    {/* TESTING THE CAMP TIMER HIGHLIGHTING */}
                    {/* <div className={style.playercamp_positioning_container}>
                        <div className={style.playercamp_image_container}>
                            <img id={style.camp_counter1} src={campCounter1}/>
                        </div>
                    </div> */}

                    {/* GAME POPUPS */}
                    {(currentGame.deck_size - claimedCards.length) === 5 ?
                    <div className="dev-text">LAST PACK BEING OPENED</div>
                    : null}

                    {remainingCards.length === 0 ?
                    <div className="dev-text">ALL CARDS HAVE BEEN CLAIMED</div>
                    : null}

                    
                </div>
                : null }
            </>
            : null }

            <div className={`${style.loading_screen} ${isGameLoaded ? style.transition_fade : null}`}>Loading . . .</div>
        </div>
    )
}





// RENDER BIG CARD POSSIBILITIES OFF SCREEN (DOESNT HELP SO FAR)
// let bigCardPrerenders = [];
// useEffect(() => {
//     if (currentGame) {
//         function leftInPack () {
//             let modulus = currentGame.deck_size % 5;
//             if (currentGame.deck_size === 0) {
//                 // GAME IS OVER
//             } else if (modulus === 0) {
//                 return 5;
//             } else {
//                 return modulus;
//             }
//         }
//         const remainingCards = currentGame.nfts.filter((nft) => {
//             return ( nft.owner === null)
//         })
//         bigCardPrerenders = currentGame.deck_size.slice(0, leftInPack()).map((n) => {
//             // console.log(n);
//             return (
//                 <div className='prerender-off-screen'>
//                     <img src={n.card.art_url} alt="Avatar" />
//                 </div>
//             )
//         })
//     }
// },[currentGame])



// CABLE STUFF

    
    // function sendMessage(message) {
    //   fetch(`messages/${user.id}/${currentGame.room.id}`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     })
        //     .then(resp => resp.json())
    //     .then(data => {
    // })}
    
    // console.log("HERE")
    // cable.subscriptions.create({ channel: "RoomsChannel", room_url: gameURL },
    // {
    // connected: () => console.log("room connected!"),
    // disconnected: () => console.log("room disconnected!"),
    // received: (updatedRoom) => console.log(updatedRoom)
    // })
