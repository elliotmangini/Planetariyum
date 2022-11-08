import style from '../StyleSheets/Arena.module.css'
import { useState , useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';

import CollectionThumb from './CollectionThumb';




export default function Arena () {
    const [ isPopUp , setIsPopUp ] = useState(false);
    const [ query , setQuery ] = useState("")
    const [ collections , setCollections ] = useState([]);
    const [ selectedCollection, setSelectedCollection ] = useState("");
    const [ gameURL , setGameURL ] = useState("");
    const [ gameType , setGameType ] = useState("solo");
    const [ isStarting , setIsStarting ] = useState(false);


    useEffect(() => {
        fetch('/collections')
        .then(resp => resp.json())
        .then(data => setCollections(data));
    },[]);

    
    const filteredCollections = collections.filter((collection) => {
        return (
            collection.name.toLowerCase().includes(query.toLowerCase()) || 
            collection.creator.display_name.toLowerCase().includes(query.toLowerCase())
        )
    })
    
    const thumbsToDisplay = filteredCollections.map((c) => {
        return (
            <CollectionThumb key={uuid()} setSelectedCollection={setSelectedCollection} collection={c} />
        )
    })

    return (
        <>
        { isStarting ? <Navigate to={`/play/${gameType}/${gameURL}`} /> : null}
            <div className={style.main_and_pop_up}>
                <div className={`${style.main_content} ${isPopUp ? style.blur : null}`}>
                    <button onClick={() => setIsPopUp(!isPopUp)}>Select Set</button>
                    <p>{selectedCollection.name}</p>




                </div>

                {/* EVERYTHING IN POPUP */}
                <div className={`${style.pop_up} ${isPopUp ? null : style.hidden}`}>
                    <div className={style.directions}>
                        <div className={style.heading}>Select Set</div>
                        <div className={style.sub_heading}></div>
                    </div>
                    <div className={style.thumbs_container}>
                        {thumbsToDisplay}
                    </div>
                    <button className={style.start_button}>Start Draft</button>
                </div>
            </div>
        </>
    )
}