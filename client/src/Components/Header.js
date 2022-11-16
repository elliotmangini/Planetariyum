import style from '../StyleSheets/Header.module.css'

import SophieReactor from '../Assets/logos/cropped_sophie_arcreactor.png';

import HeaderLogo from '../Assets/logos/header_logo.png';



export default function Header () {

    return (
        <div id={style.header_contents}>
            {/* <h1>Planetariyum</h1> */}
            <div className="center-horizontal">
                <img className={style.header_image} src={HeaderLogo}></img>
            </div>
            {/* <img className={` ${style.sitelogo}`} src={SophieReactor}></img> */}
        </div>
    )
}