import style from '../StyleSheets/Browser.module.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';





export default function CollectionCard ({ collection }) {
    const [ isDetails , setIsDetails ] = useState(false);
    const [ redirect , setRedirect ] = useState(null);

    return (
        <>
            { redirect ? <Navigate to={`/sets/${collection.local_url}`} /> : null}
            <div onClick={() => setIsDetails(true)} id={style.single_collection_container}>
                <img className={style.cover_art} src={collection.cover_url}></img>
                <div className={`${style.collection_details} ${!isDetails ? null : style.visible}`}>
                    <iframe width="80%" height="60%" scrolling="no" frameBorder="no" allow="autoplay" src={collection.embed_url}></iframe>
                    <div className={style.text_card}>
                        <div className={style.collection_description}>{collection.description}</div>
                        <div className={style.collection_description}>{collection.featured_content}</div>
                        <div onClick={() => setRedirect(true)} className={style.visit_button}>Visit</div>
                    </div>
                </div>
                <div className={style.collection_title}>{collection.name}</div>
                <div className={style.creator_plate}>{collection.creator.display_name}</div>
            </div>
        </>
    )
}