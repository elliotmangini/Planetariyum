import style from '../StyleSheets/DashRight.module.css'
import { Link } from 'react-router-dom';




export default function DashRight ({ user }) {

    return (
        <div id={style.dash_panel_container}>
            <h1 id={style.user_header}>
                &nbsp;&nbsp;{user.display_name}&nbsp;
                <Link to={ user ? "/dashboard" : "/login"}>
                    <img id={style.dash_avatar}  src={user.avatar_url}></img>
                </Link>
            </h1>
            <p>contents</p>

        </div>
    )
}