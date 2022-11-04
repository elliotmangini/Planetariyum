
import style from '../StyleSheets/Browser.module.css';



export default function Browse ({ collectionsToDisplay }) {


    return (
        <>
            <div id={style.collections_container}>
                {collectionsToDisplay}
            </div>
        </>
    )
}