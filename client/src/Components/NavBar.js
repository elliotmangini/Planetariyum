import style from '../StyleSheets/NavBar.module.css'
import { Link } from 'react-router-dom';





export default function NavBar ({ user }) {


    return (
        <>

            <div id={style.nav_container}>
                <Link to="/explore" className={style.nav_items}>Explore</Link>
                <Link to="/" className={style.nav_items}>Planetariyum</Link>
                <Link to="/arena" className={style.nav_items}>Arena</Link>
                <Link to="/mint" className={style.nav_items}>Mint</Link>
                <Link to={ user ? "/dashboard" : "/login"} className={style.nav_items}>{ user ? "Dashboard" : "Login/SignUp" }</Link>
            </div>
        </>
    )
}