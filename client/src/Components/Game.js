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
    // const renderCount = useRef(1);
    // useEffect(() => {
    //         console.log("Game Component render count: " + renderCount.current);
    //         renderCount.current = renderCount.current + 1
    // })
    
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
    // console.log("!!!!!!!!!!! GAME COMPONENT !!!!!!!!!!!");
    // console.log({
    //     user,
    //     currentGame,
    //     gameType,
    //     stagedPlayers,
    //     isGameLoaded,
    //     selectedCard,
    //     isTurnEnding,
    // })

    // "LINEAR" STATES
    let playersCount;
    let tablePosition;
    let totalCards;
    let totalTurns;

    let remainingCards = [];
    let claimedCards = [];
    let opponentsCards = [];

    let turnsRemaining;
    let turnNumber;

    let cardsInPack;
    // LINEAR TIME PACK ORGANIZATION
    if (currentGame) {
        if (currentGame.nfts) {
            playersCount = currentGame.players.length
            tablePosition = currentGame.players.findIndex(p => p.id === user.id)
            totalCards = currentGame.nfts.length;
            totalTurns = totalCards / playersCount
            
            currentGame.nfts.map((nft) => {
                // confirm the order is consistent
                // console.log(nft.id);
                
                if (nft.owner === null) {
                    remainingCards = [...remainingCards, nft];
                } else if (nft.owner.id === user.id ) {
                    claimedCards = [...claimedCards, nft];
                } else {
                    opponentsCards = [...opponentsCards, nft];
                }
            });
        }
        turnsRemaining = remainingCards.length / playersCount;
        turnNumber = totalTurns - turnsRemaining;


        let cardsInPlay = 5 * playersCount;

        function findPack () {
            let result;
            let rotationOutput = (((turnNumber + tablePosition) * 5) % (cardsInPlay))
            let incrementation = (Math.floor(turnNumber / 5));
            result = rotationOutput + (incrementation * playersCount * 5);
            
            cardsInPack = currentGame.nfts.slice(result, result + 5);
            return [result, (result + 5)];
        }

        console.log(findPack());

    }

    // LINEAR TIME LOG
    console.log({claimedCards , remainingCards, opponentsCards, playersCount, tablePosition, totalCards, totalTurns, turnsRemaining, turnNumber, cardsInPack});
    
    // GET GAME SPECIFICALLY WHEN WE RELOAD PAGE
    useEffect(() => {fetchGame()}, [user])
    function fetchGame () {
        if (user) {
            fetch(`/games/${gameURL}`)
            .then(resp => resp.json())
            .then(data => {

                setCurrentGame(data);
                setIsGameLoaded(true);
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
                        <CardPack cardsInPack={cardsInPack} remainingCards={remainingCards} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
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






// cool algo problem

// // "LINEAR" STATES
// let playersCount;
// let tablePosition;
// let totalCards;
// let totalTurns;

// let remainingCards = [];
// let claimedCards = [];
// let opponentsCards = [];

// let turnsRemaining;
// let turnNumber;

// let cardsInPack;
// // LINEAR TIME PACK ORGANIZATION
// if (currentGame) {
//     if (currentGame.nfts) {
//         playersCount = currentGame.players.length
//         tablePosition = currentGame.players.findIndex(p => p.id === user.id)
//         totalCards = currentGame.nfts.length;
//         totalTurns = totalCards / playersCount
        
//         currentGame.nfts.map((nft) => {
//             // confirm the order is consistent
//             // console.log(nft.id);
            
//             if (nft.owner === null) {
//                 remainingCards = [...remainingCards, nft];
//             } else if (nft.owner.id === user.id ) {
//                 claimedCards = [...claimedCards, nft];
//             } else {
//                 opponentsCards = [...opponentsCards, nft];
//             }
//         });
//     }
//     turnsRemaining = remainingCards.length / playersCount;
//     turnNumber = totalTurns - turnsRemaining;

//     let indexStart = turnNumber * playersCount // 1 => (0,5), 2 => (10, 15)


//     let cardsInPlay = 5 * playersCount;
//     // so from 15 how do we get function that produces 0, 5, and 10, we want to set up 0 => 0 , 1 => 5, 2 => 10 , 3 => 0 , 4 => 5, 5 => 10

//     // + 5 unless output is greater than (playersCount - 1) * 5

//     // turn 5 player 0 => 25

//     // function simplified1 (turnNumber) {
//     //     return (((turnNumber + tablePosition) * 5) % (5 * playersCount))
//     // }

//     // this gives us (0,5,10), (5,10,0), (10,0,5) => ???

//     // function simplified2 (turnNumber) {
//     //     return (((turnNumber + tablePosition) * 5) % (5 * playersCount))
//     //     // we just need to add 5 times the number of players, and do it once ever number of players turns
//     // }

//     function simplified2 (turnNumber) {
//         let result;
//         let rotationOutput = (((turnNumber + tablePosition) * 5) % (5 * playersCount))
//         let incrementation = (Math.floor(turnNumber / playersCount) + 1);
//         result = rotationOutput * incrementation;
//         return result;
//     }

//     cardsInPack = currentGame.nfts.slice(0, 5)
//     // playersCount, turn, tablePosition <= variables that need accounting for
//     // if its a multiple of 15 (players * 5) then it should return 0


//     // turn one (0)
//     // how slice works : index to include and start | first index NOT to include
//     // player 1 => (0, 5)  player1 series => 0, 10, 5, 15, 25, 20...
//     // player 2 => (5, 10) player2 series => 5, 0, 10, 20, 15, 25...
//     // player 3 => (10, 15) player3 series => 10, 5, 0, 25, 20, 15...

//     // we are "incrementing" by five, but around a circular pattern,
//     // the circle has steps in it equal to the number of players,
//     // the start position is determined by tablePosition,
//     // the max value is determined by the number of players as well.
//     //
//     // turn two (1)
//     // player 1 (0) => (10, 15)
//     // player 2 (1)=> (0, 5)
//     // player 3 (2)=> (5, 10)
//     //
//     // turn three (2)
//     // player 1 (0) => (5, 10)
//     // player 2 (1)=> (10, 15)
//     // player 3 (2)=> (0, 5)

//     // number of players has a distinct NEW effect here
//     //
//     // turn four (3)
//     // player 1 (0) => (15, 20)
//     // player 2 (1)=> (20, 25)
//     // player 3 (2)=> (25, 30)
//     //
//     // turn five (4)
//     // player 1 (0) => (25, 30)
//     // player 2 (1)=> (15, 20)
//     // player 3 (2)=> (20, 25)

//     // theres 2 ways to do this
//     // take a variable sized slice of the remaining cards
//     // take a calculated slice of the total cards
// }