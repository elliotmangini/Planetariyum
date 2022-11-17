import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect, useRef } from 'react'

import CardPack from './CardPack';
import CardBinder from './CardBinder';
import DeckStack from './DeckStack';
import WrapupCard from './WrapupCard';


import style from '../StyleSheets/Game.module.css'

import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';
import playerCamp from '../Assets/gamepieces/gamepiece_playercamp.png'
import campCounter1 from '../Assets/gamepieces/playercamp_counter_step1.png'
import AvatarFrame from '../Assets/gamepieces/avatar_frame.png'
import TurnCounter from '../Assets/gamepieces/turn_counter.png'
import GlowIndicator from './GlowIndicator';
import settingsCog from '../Assets/icons/settings_cog.png';
import radioIcon from '../Assets/icons/radio_icon.png';
import settingsBar from '../Assets/icons/settings_bar.png';
import waveform from '../Assets/icons/waveform.png';






export default function Game ({ setCurrentGame , currentGame, user }) {
    // const renderCount = useRef(1);
    // useEffect(() => {
    //         console.log("Game Component render count: " + renderCount.current);
    //         renderCount.current = renderCount.current + 1
    // })
    const started = useRef(false);
    // useEffect(() => {
    //     console.log("Game Component render count: " + started.current);
    //     started.current = started.current + 1
    // })
    const { gameType , gameURL } = useParams();
    const [ selectedCard , setSelectedCard ] = useState({});
    const [ sophieSelection , setSophieSelection ] = useState({});
    const [ isMyTurn , setisMyTurn ] = useState(true);
    const fetchIntervalRef = useRef();
    const [ isTurnEnding , setIsTurnEnding ] = useState(false);
    const [ redirect , setRedirect ] = useState(null);
    const [ isWrappingUp, setIsWrappingUp ] = useState(false);

    // STATE LOGGING
    // console.log("!!!!!!!!!!! GAME COMPONENT !!!!!!!!!!!");
    // function reportStates () {
    //     if (currentGame) {
    //         console.log("Actual States:")
    //         console.log({
    //             user,
    //             currentGame,
    //             selectedCard,
    //             isMyTurn,
    //         })
    //     }
    // }
    // reportStates();

    // "LINEAR" STATES
    let playerCount;
    let totalCards;
    let totalPacks;
    let totalTurns;

    let tablePosition;
    let sophiePosition;


    let remainingCards = [];
    let sophiePossiblePicks = [];
    let sophiePick;
    let claimedCards = [];
    let opponentsCards = [];

    let myTurnIndex;
    let unopenedPacks;
    let openedPacks;
    let cardsInPack;
    let cardsInSophiePack;

    let myTurnsRemaining;
    let indexOfPackHeld;
    let indexOfSophiePackHeld;

    // LINEAR TIME PACK ORGANIZATION
    if (currentGame) {
        if (currentGame.players.length > 0) {
            totalCards = currentGame.nfts.length; // ALWAYS CORRECT
            totalPacks = totalCards / 5; // ALWAYS CORRECT
            totalTurns = currentGame.deck_size // ALWAYS CORRECT
            playerCount = currentGame.players.length // ALWAYS CORRECT
            tablePosition = currentGame.players.findIndex(p => (p.id === user.id)) //ALWAYS CORRECT
            if (tablePosition === -1) {
                // console.log("YOU ARE NOT IN THIS GAME MATE")
            } else {
                // console.log("mapping over and sorting cards...");
                sortCards();
                myTurnsRemaining = totalTurns - claimedCards.length;
                myTurnIndex = totalTurns - myTurnsRemaining; //starts at 0, changes the moment we pull, determines what pack is rendered
                
                let activeCards = 5 * playerCount;
                
                let rotationOutput = (((myTurnIndex + tablePosition) * 5) % (activeCards));
                let packOpensAsIndex = (Math.floor(myTurnIndex / 5));
                indexOfPackHeld = rotationOutput + (packOpensAsIndex * playerCount * 5); //  | 0-4: 0, 5-9: everyone opens a new pack, etc
                
                openedPacks = ((Math.floor((myTurnIndex) / 5)) * playerCount + playerCount);
                unopenedPacks = totalPacks - openedPacks;

                console.log(myTurnIndex);
    
                cardsInPack = currentGame.nfts.slice(indexOfPackHeld, indexOfPackHeld + 5);
        
                // console.log("Pseudo-States:")
                // console.log({indexOfPackHeld});
                // console.log({claimedCards , remainingCards, opponentsCards, playerCount, tablePosition, totalCards, totalTurns, myTurnsRemaining, myTurnIndex, cardsInPack});
            }
        }
    }

    function sortCards () {
        remainingCards = [];
        claimedCards = [];
        opponentsCards = [];
        currentGame.nfts.map((nft) => {
            if (nft.owner === null) {
                remainingCards = [...remainingCards, nft]; // NOT 100% VERIFIABLE
            } else if (nft.owner.id === user.id ) {
                claimedCards = [...claimedCards, nft]; // ALWAYS CORRECT
            } else {
                opponentsCards = [...opponentsCards, nft]; // NOT 100% VERIFIABLE
            }
        });
    }
    
    
    // CREATES NFTS AND SETS GAME IN MOTION
    function startGame () {
        if (!started.current) {
            started.current = true;
            fetch(`/nfts/welcomegame/${gameURL}/${user.id},2`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                })
                .then(resp => resp.json())
                .then(data => {
                setCurrentGame(data);
            })
        } else {
            console.log("already playing");
        }
    }
    // GET GAME SPECIFICALLY WHEN WE RELOAD PAGE
    useEffect(() => {fetchGame()}, [user])

    function fetchGame () {
        console.log("fetching game...")
        if (user) {
            fetch(`/games/${gameURL}`)
            .then(resp => resp.json())
            .then(data => {
                setCurrentGame(data);
                remainingCards = [];
                sophiePossiblePicks = [];
                claimedCards = [];
                opponentsCards = [];
                data.nfts.map((nft) => {
                    if (nft.owner === null) {
                        remainingCards = [...remainingCards, nft]; // NOT 100% VERIFIABLE
                    } else if (nft.owner.id === user.id ) {
                        claimedCards = [...claimedCards, nft]; // ALWAYS CORRECT
                    } else {
                        opponentsCards = [...opponentsCards, nft]; // NOT 100% VERIFIABLE
                    }
                });
                totalCards = data.nfts.length; // ALWAYS CORRECT
                totalPacks = totalCards / 5; // ALWAYS CORRECT
                totalTurns = data.deck_size // ALWAYS CORRECT
                playerCount = data.players.length // ALWAYS CORRECT
                tablePosition = data.players.findIndex(p => (p.id === user.id)) //ALWAYS CORRECT
                sophiePosition = data.players.findIndex(p => (p.id === 2)) //ALWAYS CORRECT
                myTurnsRemaining = totalTurns - claimedCards.length;
                myTurnIndex = totalTurns - myTurnsRemaining; //starts at 0, changes the moment we pull, determines what pack is rendered
                let activeCards = 5 * playerCount;
                let rotationOutput = (((myTurnIndex + tablePosition) * 5) % (activeCards));
                let sophieRotation = (((myTurnIndex + sophiePosition) * 5) % (activeCards));
                let packOpensAsIndex = (Math.floor(myTurnIndex / 5));
                indexOfPackHeld = rotationOutput + (packOpensAsIndex * playerCount * 5); //  | 0-4: 0, 5-9: everyone opens a new pack, etc
                indexOfSophiePackHeld = sophieRotation + (packOpensAsIndex * playerCount * 5); //  | 0-4: 0, 5-9: everyone opens a new pack, etc

                openedPacks = ((Math.floor((myTurnIndex) / 5)) * playerCount + playerCount);
                unopenedPacks = totalPacks - openedPacks;
    
                cardsInPack = data.nfts.slice(indexOfPackHeld, indexOfPackHeld + 5);

                cardsInSophiePack = data.nfts.slice(indexOfSophiePackHeld, indexOfSophiePackHeld + 5);

                console.log(cardsInPack, cardsInSophiePack);

                cardsInSophiePack.map((c) => {
                    console.log(c);
                    if (c.owner === null) {
                        sophiePossiblePicks = [...sophiePossiblePicks, c]; // NOT 100% VERIFIABLE
                    }
                })

                console.log(sophiePossiblePicks);



                setSophieSelection(sophiePossiblePicks[0]);


        
                // console.log("Pseudo-States:")
                // console.log({indexOfPackHeld});
                // console.log({claimedCards , remainingCards, opponentsCards, playerCount, tablePosition, totalCards, totalTurns, myTurnsRemaining, myTurnIndex, cardsInPack});
                // console.log(remainingCards , claimedCards, opponentsCards) // THIS IS WORKING
                console.log({myTurnIndex})
                console.log({totalCards})
                console.log("when there are " + (totalCards - (myTurnIndex * playerCount)) + " cards remaining we can start next round")
                console.log("there are " + (remainingCards.length) + " remaining/unclaimed.")
                console.log("readiness-detecting reports that ready: " + (remainingCards.length === (totalCards - (myTurnIndex * playerCount))))
                if (remainingCards.length === (totalCards - (myTurnIndex * playerCount))) {
                    console.log("setting isMyTurn to true");
                    setisMyTurn(true);
                } else {
                    // setisMyTurn(false);
                    callTimeout();
                }
            })
        }
    }
    
    function handleSubmitTurn () {
        
        if ((Object.keys(selectedCard).length !== 0 && user)) {
            console.log(sophieSelection)
            setIsTurnEnding(true); // THIS TRIGGERS ANIMATIONS
            setisMyTurn(false); // START CONTINUOUS FETCHING
            fetch(`/nfts/welcomeclaim/${selectedCard.id}/${user.id}/${sophieSelection.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            })
            .then(resp => resp.json())
            .then(data => {
                const timer = setTimeout(() => {
                    setSelectedCard({}); // CLEAR SELECTED CARD AFFFFFTER ANIMATION OFF SCREEN
                    // setIsTurnEnding(false);
                    setCurrentGame(data);
                }, 3700
                );
                return () => clearTimeout(timer);
            })
        } else {
            // HANDLE THIS "ERROR"
        }
    }
    
    let repeat;
    
    function callTimeout () {
        if (!isMyTurn) {
            // fetchGame()
            repeat = setTimeout(() => {
                console.log("inside setInterval");
                console.log({isMyTurn})
                fetchGame()
            }, 3800); // HOW LONG TO WAIT IN BETWEEN CHECKING FOR NEXT ROUND
        } else {
            console.log("continuous fetches not needed because it is my turn")
            // setisMyTurn(true);
            setIsTurnEnding(false);
            console.log("running clearInterval (it is the very next line")
            clearTimeout(repeat);
        }
    }
    
    // CONTINUOUSLY FETCH IF ITS NOT MY TURN
    console.log({isMyTurn})
    useEffect(() => {
            console.log("isMyTurn has changed and is triggering useEffect containing setInterval")
            console.log("inside isMyTurn useEffect")
            console.log({isMyTurn})
            callTimeout();
    }, [isMyTurn])

    let wrapUpCards;



    if (remainingCards.length === 0) {
        wrapUpCards = claimedCards.map((nft) => {
            return (
                    <WrapupCard key={nft.id} nft={nft}/>
            )
        })
    }

    if (currentGame) {

        console.log(currentGame.collection.arena_art_url)
    }


    return (
        <>
        <div className={`${isWrappingUp ? style.end_blur : null } ${style.give_game_fullscreen}`}>
            <img className={`${style.arena_background}`} src={currentGame ? currentGame.collection.arena_art_url : null}></img>
            { currentGame && user ?
            <>
                { currentGame.nfts.length === 0 ?
                    <Lobby user={user} currentGame={currentGame} startGame={startGame}/>
                : null }

                { currentGame.nfts.length > 0 ?
                <div className={style.game_container}>

                    {/* SETTINGS */}
                    <div className={style.settings_box}>


                    {/* unclaimed nfts/unpulled cards count */}
                    {/* currentGame.deck_size * currentGame.players.length */}
                        <div></div>
                        <div className={style.dynamic_island}>
                            <img src={waveform}></img>
                        </div>
                        <div className="center-text">
                            <div className={style.number_indicators}>{currentGame.deck_size - claimedCards.length}<span>c</span></div>
                        </div>
                        <img className={style.settings_bar} src={settingsBar}></img>
                        <div className="center-text">
                            <div className={style.number_indicators}>{unopenedPacks}<span>p</span></div>
                        </div>
                            <img className={style.settings_bar} src={settingsBar}></img>
                        <img className={style.settings_icon} id={style.radio_icon} src={radioIcon}></img>
                        <img className={style.settings_bar} src={settingsBar}></img>
                        <img className={style.settings_icon} id={style.settings_cog} src={settingsCog}></img>
                        <div></div>
                    </div>
                    
                    {/* DECKSTACK */}
                    <DeckStack force={remainingCards.length === 0 ? true : false} claimedCards={claimedCards} user={user} isMyTurn={isMyTurn} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>

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
                                        { selectedCard && !isMyTurn ? <GlowIndicator /> : null}
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
                    <div className={`center-text ${style.last_pack_warning}`}>LAST UNSEEN ASSETS BEING OPENED NOW!</div>
                    : null}

                    {remainingCards.length === 0 ?
                    <>
                        {/* <div className="dev-text">ALL CARDS HAVE BEEN CLAIMED</div> */}
                        
                        <div className={style.scroll_container_new}>
                            <div className={style.wrapup_grid}>
                                {wrapUpCards}
                            </div>
                        </div>
                        <div className={style.wrap_up_btn_container}>
                            <div className="relative100">
                                <div className="margin-container">
                                    <div onClick={() => setIsWrappingUp(true)} className={style.wrap_up_btn}>Wrap Up</div>
                                </div>
                            </div>
                        </div>
                    </>
                    : null}
                </div>
                : null }
            </>
            : null }

            <div className={`${style.loading_screen} ${currentGame ? style.transition_fade : null}`}>Loading . . .</div>
        </div>
        { isWrappingUp ?
            <>
                <div className="vertical-16">
                    {/* <div className="center-horizontal"> */}
                        {/* <div className="absolute100"> */}
                            <div className={`${style.wrap_up_container}`}>
                                <div className={style.expand_popup}>
                                    <h3>Well Done!</h3>
                                    <div className={style.body_smaller}>
                                    <div>That's your first draft, and hopefully a fun new way to collect samples, time to launch off this creative springboard ^_^</div>

                                    </div>
                                    <div className={style.button_container}>
                                        <div className={style.move_grid_down}>
                                            <div className={style.for_the_love_of_god}>
                                            <div className={style.download_button_grid}>
                                                <div id={style.d_all} className={style.download_button}>Download All</div>
                                                <div id={style.d_unique} className={style.download_button}>Download Unique</div>
                                                <div id={style.d_next} className={style.download_button}>Head To Submissions</div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        {/* </div> */}
                    {/* </div> */}
                </div>
            </>
            : null }
        </>
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
// let playerCount;
// let tablePosition;
// let totalCards;
// let totalTurns;

// let remainingCards = [];
// let claimedCards = [];
// let opponentsCards = [];

// let myTurnsRemaining;
// let turnNumber;

// let cardsInPack;
// // LINEAR TIME PACK ORGANIZATION
// if (currentGame) {
//     if (currentGame.nfts) {
//         playerCount = currentGame.players.length
//         tablePosition = currentGame.players.findIndex(p => p.id === user.id)
//         totalCards = currentGame.nfts.length;
//         totalTurns = totalCards / playerCount
        
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
//     myTurnsRemaining = remainingCards.length / playerCount;
//     turnNumber = totalTurns - myTurnsRemaining;

//     let indexStart = turnNumber * playerCount // 1 => (0,5), 2 => (10, 15)


//     let activeCards = 5 * playerCount;
//     // so from 15 how do we get function that produces 0, 5, and 10, we want to set up 0 => 0 , 1 => 5, 2 => 10 , 3 => 0 , 4 => 5, 5 => 10

//     // + 5 unless output is greater than (playerCount - 1) * 5

//     // turn 5 player 0 => 25

//     // function simplified1 (turnNumber) {
//     //     return (((turnNumber + tablePosition) * 5) % (5 * playerCount))
//     // }

//     // this gives us (0,5,10), (5,10,0), (10,0,5) => ???

//     // function simplified2 (turnNumber) {
//     //     return (((turnNumber + tablePosition) * 5) % (5 * playerCount))
//     //     // we just need to add 5 times the number of players, and do it once ever number of players turns
//     // }

//     function simplified2 (turnNumber) {
//         let result;
//         let rotationOutput = (((turnNumber + tablePosition) * 5) % (5 * playerCount))
//         let incrementation = (Math.floor(turnNumber / playerCount) + 1);
//         result = rotationOutput * incrementation;
//         return result;
//     }

//     cardsInPack = currentGame.nfts.slice(0, 5)
//     // playerCount, turn, tablePosition <= variables that need accounting for
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