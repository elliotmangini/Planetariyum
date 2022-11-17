import style from '../StyleSheets/Game.module.css'
import AudioPlayer from './AudioPlayer';
import { useState } from 'react';





export default function WrapupCard ({ nft }) {
  const [ audioAction , setAudioAction ] = useState("");

  function handleClick () {
    setAudioAction("play");
    // console.log("click to play");

    // SLIGHTLY CONFUSED WHY WE NEED TO WAIT 1MS TO GET IT TO PLAY BUT I KNEW WHY AT ONE POINT
    const timer2 = setTimeout(() => {
        // THIS ALLOWS MULTIPLE PLAYS WETHER WE NEED TO SET A HIGHER LEVEL STATE OR NOT
        setAudioAction("");
    }, 100
    );
    return () => clearTimeout(timer2);
  }

  return (
    <>
      <div className={style.wrap_card_container}>
        <img
          onClick={handleClick}
          className={`${style.wrap_card_image}`}
          src={nft.card.art_url}
          alt="Big Card"
        />
      </div>

      {audioAction ? <AudioPlayer action={audioAction} clearAction={setAudioAction}  sound={nft.card.asset_url} /> : null }

    </>
  );
}
