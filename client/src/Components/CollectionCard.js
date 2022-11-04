import style from '../StyleSheets/Browser.module.css';




export default function CollectionCard ({ collection }) {

    return (
        <div id={style.single_collection_container}>
            <img className={style.cover_art} src={collection.cover_url}></img>
            <div className={style.collection_title}>{collection.name}</div>
        </div>
    )
}