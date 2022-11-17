import style from '../StyleSheets/Lobby.module.css'

import SophiePfp from '../Assets/placeholders/Sophie_pfp.png';



export default function Lobby ({ user , startGame, currentGame }) {

    console.log(currentGame)

    return (
        <>
            <div className={style.lobby_100}>
                <div className="relative100">
                    <div className="center-vertical">
                    <div className={`${style.lobby_panel} center-horizontal`}>

                        <div className={style.title_wrapper}>
                            <div className={style.lobby_title}>
                                {currentGame.collection.name}
                            </div>
                            <div>
                                {currentGame.game_type} Game -&nbsp;
                                <span>{currentGame.deck_size}</span> pull.
                            </div>
                            <div><span>{user.display_name}</span> vs <span>Sophie</span></div>
                        </div>

                        <div className={style.players_container}>
                            <div className={style.player_slot}>
                                <div className="easy-left-text">
                                    <div>{user.display_name}</div>
                                </div>
                                <div className="easy-right-text">
                                    <div className={style.status_icon}>✅</div>
                                </div>
                                <div>
                                    <img className={style.lobby_avatar} src={user.avatar_url}></img>
                                </div>
                            </div>
                            <div className={style.player_slot}>
                                <div className="easy-left-text">
                                    <div>Sophie</div>
                                </div>
                                <div className="easy-right-text">
                                    <div className={style.status_icon}>✅✅✅</div>
                                </div>
                                <div>
                                    <img className={style.lobby_avatar} src={SophiePfp}></img>
                                </div>
                            </div>
                        </div>





                    <div className={style.start_game_button} onClick={() => startGame(true)} >Start Game</div>
                    </div>
                    

                    </div>





                </div>
            </div>
        </>
    )
}