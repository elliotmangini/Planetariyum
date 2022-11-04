import styleRightGeneric from '../StyleSheets/DashRight.module.css'
import style from '../StyleSheets/DashRightUsered.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import avatarPlaceholder from '../Assets/placeholders/Avatar_Placeholder.png';





export default function DashRight ({ user, setUser, setPath }) {
    const [ isQuickSettings, setIsQuickSettings ] = useState(false);

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setUser(null);
            }
        });
    }

    return (
        <div id={styleRightGeneric.dash_panel_container}>

            <h1 id={styleRightGeneric.user_header}>
                <div id={styleRightGeneric.spacer}></div>
                <Link onClick={() => setPath("dashboard")} id={styleRightGeneric.username} to="/dashboard">&nbsp;&nbsp;{user.display_name}&nbsp;</Link>
                <img onClick={() => setIsQuickSettings(!isQuickSettings)} id={styleRightGeneric.dash_avatar}  src={user.avatar_url ? user.avatar_url : avatarPlaceholder}></img>
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

            <p>contents</p>
            <p>contents</p>
            <p>contents</p>
            <p>contents</p>
            <p>contents</p>

        </div>
    )
}