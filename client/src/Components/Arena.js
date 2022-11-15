import style from '../StyleSheets/Arena.module.css'
import { useState , useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Navigate } from 'react-router-dom';

import CollectionThumb from './CollectionThumb';




export default function Arena ({ setCurrentGame, user }) {
    const [ isPopUp , setIsPopUp ] = useState(false);
    const [ query , setQuery ] = useState("")
    const [ collections , setCollections ] = useState([]);
    const [ selectedCollection, setSelectedCollection ] = useState("");
    const [ gameType , setGameType ] = useState("draft");
    const [ gameURL , setGameURL ] = useState("");
    const [ redirect , setRedirect ] = useState(null);
    const [ popSequence , setPopSequence ] = useState(0);
    const [errors, setErrors] = useState([]);


    // POPUP SEQUENCE HANDLERS
    function handleSetCollection () {
        setPopSequence(2);
        setIsPopUp(false);
    }

    function handleEditCollection () {
        setIsPopUp(true);
        setPopSequence(1);
    }


    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            createGame();
        }
    }

    function createGame () {
        if (gameURL) {
            const gameObj = {
                collection_id: selectedCollection.id,
                deadline: "03 Feb 2023 04:05:06 +0000",
                local_url: gameURL.replace(/\s/g, ""),
                game_type: gameType,
                deck_size: 50,
            }
            fetch("/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameObj),
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(data => setCurrentGame(data))
                    setRedirect([gameType, gameURL.replace(/\s/g, "")]);
                } else {
                    resp.json().then((err) => setErrors(err.errors));
                }
            })
        } else {
            // ERRORS
        }
    }


    useEffect(() => {
        fetch('/collections')
        .then(resp => resp.json())
        .then(data => {
            setCollections(data);
            setSelectedCollection(data[0]);
        });
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
        { redirect && user ? <Navigate to={`/play/${gameType}/${gameURL.replace(/\s/g, "")}`} /> : null}
        { redirect == "signup" ? <Navigate to="/signup" /> : null}

            <div className={style.main_and_pop_up}>
                <div className={`${style.main_content} ${isPopUp ? style.blur : null}`}>
                    <div className={style.game_details_panel}>
                        <div className={style.header_box}>
                            Configure Draft
                        </div>
                        <div className={style.game_settings_box}>

                            <div onClick={handleEditCollection} className={style.collection_slot}>
                                <div className={style.thumb_container}>
                                    <div className={style.thumb_text_container}>
                                        <img className={style.cover_art} src={selectedCollection ? selectedCollection.cover_url : null}></img>
                                        <div className={style.collection_title}>
                                            {selectedCollection ? selectedCollection.creator.display_name : null}
                                            <br />
                                            {selectedCollection ? selectedCollection.name : "Choose A Set"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={style.game_type_selector}>

                            </div>
                        </div>
                        <div className={style.custom_settings_box}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                type="text"
                                placeholder="Custom URL"
                                value={gameURL}
                                onKeyPress={(e) => handleEnterKey(e)}
                                onChange={(e) => setGameURL(e.target.value)}
                                />
                            </form>

                        </div>
                        <div onClick={gameURL && user ? createGame : () => setRedirect("signup")} className={style.create_button}>Create Draft</div>
                    </div>

                    {/* <button onClick={() => setIsPopUp(!isPopUp)}>Select Set</button> */}
                    {/* <p>{selectedCollection.name}</p> */}

                </div>

                {/* EVERYTHING IN POPUPS */}
                <div className={`${style.pop_up} ${isPopUp ? null : style.hidden}`}>

                    {/* POP 1 */}
                    { popSequence === 1 ?
                    <>
                        <div className={style.directions}>
                            <div className={style.heading}>Select Set</div>
                            <div className={style.sub_heading}></div>
                        </div>
                        <div className={style.thumbs_container}>
                            <div className={style.inset_thumbs}>
                                {thumbsToDisplay}
                            </div>
                        </div>
                    </>
                    : null }

                    {/* { popSequence === 1 ?
                    <>
                        <div className={style.directions}>
                            <div className={style.heading}>Select Set</div>
                            <div className={style.sub_heading}></div>
                        </div>
                        <div className={style.thumbs_container}>
                            <div className={style.inset_thumbs}>
                                {thumbsToDisplay}
                            </div>
                        </div>
                    </>
                    : null } */}

                    <button onClick={handleSetCollection} className={style.next_button}>Next</button>
                </div>
            </div>
        </>
    )
}