import style from '../StyleSheets/Browser.module.css';
import { useState, useEffect } from 'react';
import CollectionCard from '../Components/CollectionCard';
import { v4 as uuid } from 'uuid';




export default function Browse () {
    const [ tab , setTab ] = useState(null)
    const [ query , setQuery ] = useState("")
    const [ collections , setCollections ] = useState([]);

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
    
    const collectionsToDisplay = filteredCollections.map((c) => {
        return (
            <CollectionCard key={uuid()} collection={c} />
        )
    })
    
    return (
        <>  
            <div className="tab-header">
                <div className="tab-button tab-1-of-5">Featured</div>
                <div className="tab-button tab-2-of-5">New</div>
                <div className="tab-button tab-3-of-5">Following</div>
                <div className="tab-button tab-4-of-5">Random</div>
                { tab === "search" ?
                <>
                    <div className="tab-cover"></div>
                    <div className="tab-search">
                        <form>
                            <input
                            type="text"
                            placeholder="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            />
                        </form>
                        <div onClick={() => setTab(null)} className="back-button">X</div>
                    </div>
                </>
                : null }
                <div className={`tab-button ${tab === "search" ? "tab-1-of-5" : "tab-5-of-5"}`} onClick={() => setTab("search")} >Search 🔎</div>
            </div>
            <div id={style.collections_container}>
                {collectionsToDisplay}
            </div>
        </>
    )
}