import style from '../StyleSheets/Browser.module.css';
import { useState } from 'react';



export default function Browse ({ collectionsToDisplay }) {
    const [ tab , setTab ] = useState(null)


    return (
        <>  
            <div className="tab-header">
                <div className="tab-button tab-1-of-5">Featured</div>
                <div className="tab-button tab-2-of-5">New</div>
                <div className="tab-button tab-3-of-5">Following</div>
                <div className="tab-button tab-4-of-5">Random</div>
            { tab === "search" ?
            <div className="tab-search">
                <form>
                    <input
                    type="text"
                    placeholder="Search"
                    />
                </form>
            </div>
            : null }
                <div className={`tab-button ${tab === "search" ? "tab-1-of-5" : "tab-5-of-5"}`} onClick={() => setTab("search")} >Search 🔎</div>
            </div>
            <div id={style.collections_container}>
                {collectionsToDisplay}
            </div>
        </>
    )
}