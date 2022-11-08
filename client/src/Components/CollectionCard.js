import style from '../StyleSheets/Browser.module.css';
import { useState } from 'react';




export default function CollectionCard ({ collection }) {
    const [ isDetails , setIsDetails ] = useState(false);

    return (
        <div onClick={() => setIsDetails(true)} id={style.single_collection_container}>
            <img className={style.cover_art} src={collection.cover_url}></img>
            <div className={`${style.collection_details} ${!isDetails ? null : style.visible}`}>
                <iframe width="80%" height="60%" scrolling="no" frameBorder="no" allow="autoplay" src={collection.embed_url}></iframe>
                <div className={style.text_card}>
                    <div class_name={style.collection_description}>{collection.description}</div>
                    <div class_name={style.collection_description}>{collection.featured_content}</div>
                </div>
            </div>
            <div className={style.collection_title}>{collection.name}</div>
            <div className={style.creator_plate}>{collection.creator.display_name}</div>
        </div>
    )
}