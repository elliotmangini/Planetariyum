import style from '../StyleSheets/Lobby.module.css'




export default function Lobby ({ startGame }) {

    return (
        <>
            <div className={style.lobby_100}>
                <div className="relative100">
                    <div className="center-vertical">
                    <div className={`${style.lobby_panel} center-horizontal`}>
                        KAJSDFKJASDKJF
                    </div>

                    </div>
                    <div className={style.start_game_button} onClick={() => startGame(true)} >Start Game</div>





                </div>
            </div>
        </>
    )
}