import style from '../StyleSheets/Game.module.css'





export default function WrapupCard ({ nft }) {
  return (
    <>
      <div className={style.wrap_card_container}>
        <img
          className={`${style.wrap_card_image}`}
          src={nft.card.art_url}
          alt="Big Card"
        />
      </div>
    </>
  );
}
