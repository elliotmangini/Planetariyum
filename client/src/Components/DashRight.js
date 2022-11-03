import style from '../StyleSheets/DashRight.module.css'
import { Link } from 'react-router-dom';




export default function DashRight ({ user }) {

    return (
        <div id={style.dash_panel_container}>
            <h1>{user.display_name}</h1>
            <Link to={ user ? "/dashboard" : "/login"}>💿</Link>
            <h1>dash right lives here</h1>

        </div>
    )
}