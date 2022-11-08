import style from '../StyleSheets/CollectionThumb.module.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';





export default function CollectionThumb ({ collection , setSelectedCollection }) {
    const [ redirect , setRedirect ] = useState(null);

    return (
        <>
            { redirect ? <Navigate to={`/sets/${collection.local_url}`} /> : null}
            <div className={style.thumb_container}>
                <div onClick={() => setSelectedCollection(collection)} className={style.thumb_text_container}>
                    <img className={style.cover_art} src={collection.cover_url}></img>
                    <div className={style.collection_title}>{collection.name}</div>
                    {/* <div className={style.creator_plate}>{collection.creator.display_name}</div> */}
                </div>
            </div>
        </>
    )
}