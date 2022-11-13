import { useParams } from 'react-router-dom';
import Lobby from './Lobby';
import { useState, useEffect } from 'react'

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






export default function Game ({ setCurrentGame , currentGame, user }) {
    // const [ spinReset , setSpinReset ] = useState(false);
    const { gameType , gameURL } = useParams();
    const [ isStart , setIsStart ] = useState(false);
    const [ stagedPlayers , setStagedPlayers ] = useState(["2,3,4"]);
    const [ isGameLoaded , setIsGameLoaded ] = useState(false);
    const [ selectedCard , setSelectedCard ] = useState({});
    const [ remainingTurns , setRemainingTurns ] = useState();
    const [ isTurnEnding , setIsTurnEnding ] = useState(false);
    const [ claimedCards , setClaimedCards ] = useState([]);
    const [ allCardsClaimed , setAllCardsClaimed ] = useState(false);
    console.log("!!!!!!!!!!! GAME COMPONENT !!!!!!!!!!!");
    console.log({
        // user,
        // gameType,
        // isStart,
        // stagedPlayers,
        // isGameLoaded,
        // selectedCard,
        // remainingTurns,
        // isTurnEnding,
        // claimedCards,
        // allCardsClaimed,
    })
    
    // GET GAME SPECIFICALLY WHEN WE RELOAD PAGE
    useEffect(() => {
        if (user) {
            fetch(`/games/${gameURL}`)
            .then(resp => resp.json())
            .then(data => {
                setCurrentGame(data);
                setIsGameLoaded(true);
                setRemainingTurns(data.deck_size);
                findPulls(data.nfts);
                setRemainingTurns(data.deck_size)
                console.log("Getting game after refresh... or on initial load");
            })
        }
    }, [user])
    
    // CREATES NFTS AND SETS GAME IN MOTION
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
    
    // FIND CARDS THE PLAYER NEED IN DECKSTACK AND FOR LOGIC
    function findPulls (nftArray) {
        setClaimedCards(nftArray.filter((nft) => {
            // console.log(user.id);
            // THIS IF KEEPS FROM READING AN UNDEFINED VALUE
            if ( nft.owner !== null && user ) {
                // console.log(nft);
            return ( nft.owner.id === user.id )
            }
        }))
    }

    // CHECK IF THE GAME IS OVER ONCE WE KNOW WHAT CARDS ARE CLAIMED
    useEffect(() => {
        if ( currentGame ) {
            if ( claimedCards.length >= currentGame.deck_size) {
                setAllCardsClaimed(true);
            }
        }
    }, [claimedCards]);

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
                        if ( !allCardsClaimed ) {
                            setSelectedCard({});
                            setCurrentGame(data);
                            setRemainingTurns(data.deck_size);
                            findPulls(data.nfts);
                            setIsTurnEnding(false);
                        }
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
                <div className={style.game_container}>

                    {/* SETTINGS */}
                    <div className={style.settings_box}>

                    {/* unclaimed nfts/unpulled cards count */}
                    {/* currentGame.deck_size * currentGame.players.length */}
                        <div>{currentGame.deck_size - claimedCards.length} pulls left</div>
                        <div>{currentGame.players.length * Math.floor(((currentGame.deck_size - claimedCards.length - 1) / 5))} unopened pack(s) left</div>
                    </div>

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
                    {/* <div className={`${style.deckstack_positioning} ${style.slide_up} ${ isDeckStack ? style.deckstack_maximize : style. deckstack_minimize}`}>
                        <div onClick={() => setIsDeckStack(false)} className={`${style.deckstack_hide_button} ${ isDeckStack ? style.deckstack_hide_button_float_up : style.deckstack_hide_button_float_down}`}></div> */}
                        <DeckStack claimedCards={claimedCards} user={user} remainingTurns={remainingTurns} isTurnEnding={isTurnEnding} selectedCard={selectedCard} setSelectedCard={setSelectedCard} currentGame={currentGame}/>
                        {/* { !isDeckStack ? <div onClick={() => setIsDeckStack(true)} className={style.deckstack_show_hitbox}></div> : null }
                    </div> */}
                    
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

                    {/* <div className={style.playercamp_positioning_container}>
                        <div className={style.playercamp_image_container}>
                            <img id={style.camp_counter1} src={campCounter1}/>
                        </div>
                    </div> */}

                    {/* GAME POPUPS */}
                    {(currentGame.deck_size - claimedCards.length) === 5 ?
                    <div className="dev-text">LAST PACK BEING OPENED</div>
                    : null}

                    {allCardsClaimed ?
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