import styleRightGeneric from '../StyleSheets/DashRight.module.css'
import style from '../StyleSheets/DashRightUserless.module.css'
import navStyle from '../StyleSheets/NavBar.module.css'
import { Link } from 'react-router-dom';
import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';
import { Navigate } from 'react-router-dom';


// import




export default function DashRightUserless ({  isLogout, setIsLogout, }) {

    return (
        <>
        { isLogout ? <Navigate to="/" /> : null}
        <div className='halfsecond-lazyload' id={styleRightGeneric.dash_panel_container}>
            <h1 id={styleRightGeneric.user_header}>
                <div id={styleRightGeneric.spacer}></div>
                <Link id={styleRightGeneric.username} to="/login">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log In&nbsp;&nbsp;&nbsp;&nbsp;</Link>
                <img id={styleRightGeneric.dash_avatar}  src={avatarPlaceholder}></img>
            </h1>
        </div>
        </>
    )
}