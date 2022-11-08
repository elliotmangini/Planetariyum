import style from '../StyleSheets/Browser.module.css';




export default function CollectionCard ({ collection }) {

    return (
        <div id={style.single_collection_container}>
            <img className={style.cover_art} src={collection.cover_url}></img>
            <div className={style.collection_title}>{collection.name}</div>
            <div className={style.creator_plate}>{collection.creator.display_name}</div>
            <div className={style.collection_details}>
                <iframe width="100%" height="200" scrolling="no" frameBorder="no" allow="autoplay" src={collection.embed_url}></iframe>
                <div class_name={style.collection_description}>{collection.description}</div>
                <div class_name={style.collection_description}>{collection.featured_content}</div>
            </div>

        </div>
    )
}