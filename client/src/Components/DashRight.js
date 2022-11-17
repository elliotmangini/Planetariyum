import styleRightGeneric from '../StyleSheets/DashRight.module.css'
import style from '../StyleSheets/DashRightUsered.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';






export default function DashRight ({ isLogout, setIsLogout, user, setUser, setPath }) {
    const [ isQuickSettings, setIsQuickSettings ] = useState(false);
    const history = useLocation();

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                console.log("click")
                // setIsLogout(true);
                setUser(null);
            }
        });
    }

    return (
        <>
            { isLogout ? <Navigate to="/" /> : null}
            <div className="halfsecond-lazyload" id={`halfsecond-lazyload ${styleRightGeneric.dash_panel_container}`}>

                <h1 id={styleRightGeneric.user_header}>
                    <div id={styleRightGeneric.spacer}></div>
                    <Link onClick={() => setPath("dashboard")} id={styleRightGeneric.username} to={`/u/${user.username}`}>
                        {history.pathname.slice(0,3) === "/u/" ?
                        <div className={styleRightGeneric.rotate_right_90}>⌄</div>
                        : null}
                        {history.pathname.slice(0,3) !== "/u/" ? "⌄" : null}&nbsp;&nbsp;{user.display_name}&nbsp;</Link>
                    <div>
                        <img onClick={() => setIsQuickSettings(!isQuickSettings)} id={styleRightGeneric.dash_avatar}  src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
                    </div>
                </h1>
                { isQuickSettings ?
                    <div id={style.quick_settings_panel}>
                        <div id={style.quick_settings_container}>
                            <h2 className={style.quick_settings_btn}>Inbox</h2>
                            <h2 className={style.quick_settings_btn}></h2>
                            <h2 onClick={handleLogout} className={style.quick_settings_btn}>Log Out</h2>
                        </div>
                    </div>
                : null }

                {/* <div className={styleRightGeneric.dash_contents_container}>
                    <p>contents</p>
                    <p>contents</p>
                    <p>contents</p>
                    <p>contents</p>
                    <p>contents</p>
                </div> */}

            </div>
        </>
    )
}