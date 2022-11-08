import style from '../StyleSheets/Arena.module.css'
import { useState , useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';

import CollectionThumb from './CollectionThumb';




export default function Arena ({ setCurrentGame }) {
    const [ isPopUp , setIsPopUp ] = useState(false);
    const [ query , setQuery ] = useState("")
    const [ collections , setCollections ] = useState([]);
    const [ selectedCollection, setSelectedCollection ] = useState("");
    const [ gameType , setGameType ] = useState("solo");
    const [ gameURL , setGameURL ] = useState("testgame");
    const [ redirect , setRedirect ] = useState(null);


    function createGame () {
        fetch("/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                collection_id: selectedCollection.id,
                deadline: "03 Feb 2023 04:05:06 +0000",
            }),
        })
        .then(resp => resp.json())
        .then(data => setCurrentGame(data))
        setRedirect([gameType, gameURL]);
    }


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
        { redirect ? <Navigate to={`/play/${gameType}/${gameURL}`} /> : null}
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
                    <button onClick={createGame} className={style.start_button}>Start Draft</button>
                </div>
            </div>
        </>
    )
}