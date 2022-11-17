import style from '../StyleSheets/Lobby.module.css'




export default function Lobby ({ startGame }) {

    return (
        <>
            <div className={style.lobby_100}>
                <div className="relative100">
                    <div>
                        KAJSDFKJASDKJF
                    </div>
                    <div className={style.start_game_button} onClick={() => startGame(true)} >Start Button</div>





                </div>
            </div>
        </>
    )
}