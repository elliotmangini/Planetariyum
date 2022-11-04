import styleRightGeneric from '../StyleSheets/DashRight.module.css'
import style from '../StyleSheets/DashRightUserless.module.css'
import { Link } from 'react-router-dom';

// import




export default function DashRightUserless () {

    return (
        <div id={styleRightGeneric.dash_panel_container}>
            <Link to="/login" className={style.nav_items}>LogIn/SignUp</Link>


        </div>
    )
}