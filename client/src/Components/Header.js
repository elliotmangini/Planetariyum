import style from '../StyleSheets/Header.module.css'

import SophieReactor from '../Assets/logos/cropped_sophie_arcreactor.png';



export default function Header () {

    return (
        <div id={style.header_contents}>
            <h1>Planetariyum</h1>
            {/* <img className={` ${style.sitelogo}`} src={SophieReactor}></img> */}
        </div>
    )
}