



export default function Lobby ({ startGame }) {

    return (
        <>
            <div>Game Lobby</div>
            <div onClick={() => startGame(true)} >Start Button</div>
        </>
    )
}