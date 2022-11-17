import style from "../StyleSheets/Home.module.css";

export default function GridItem({ scrollToArticle, item }) {
  return (
    <>
      <div onClick={() => scrollToArticle(item.title)} className={style.grid_box}>
        <div className={style.emptyscroll}>
            <img className={style.cover_image} src={item.cover_url}></img>
            <div className={style.publication_title}>{item.title}</div>
        </div>
      </div>
    </>
  );
}
