import style from '../StyleSheets/NavBar.module.css'
import { Link } from 'react-router-dom';





export default function NavBar ({ user }) {


    return (
        <>
            <div id={style.sidebar_container}>
                <Link to="/" className={style.nav_items}>Sphere</Link>
                <Link to="/arena" className={style.nav_items}>Arena</Link>
                <Link to="/mint" className={style.nav_items}>Mint</Link>
                <Link to="/explore" className={style.nav_items}>Explore</Link>
            </div>
        </>
    )
}