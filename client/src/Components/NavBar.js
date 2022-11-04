import style from '../StyleSheets/NavBar.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';




export default function NavBar ({ path, setPath }) {
    const [ openTab , setOpenTab ] = useState("");

    function clickedMainTab (newPath) {
        setPath(newPath);
        setOpenTab("");
    }

    function clickedSubTab (newPath) {
        setPath(newPath[0]);
        setOpenTab(newPath[1]);
    }


    return (
        <>
            <div id={style.sidebar_container}>
                <Link id={path === "" ? style.selected_path : null} onClick={() => clickedMainTab("")} to="/" className={style.nav_items}>Home</Link>
                {/* { path === "" ? */}
                    <>
                        <Link id={openTab === "Browse" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["", "Browse"])} to="/Browse" className={style.sub_items}>Browse</Link>
                        <Link id={openTab === "Forums" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["", "Forums"])} to="/Forums" className={style.sub_items}>Forums</Link>
                        <Link id={openTab === "Themes" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["", "Themes"])} to="/Themes" className={style.sub_items}>Themes</Link>
                        <Link id={openTab === "Resources" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["", "Resources"])} to="/Resources" className={style.sub_items}>Resources</Link>
                    </>
                {/* : null } */}

                <Link id={path === "Sphere" ? style.selected_path : null}  onClick={() => clickedMainTab("Sphere")}  to="/Sphere" className={style.nav_items}>Social</Link>
                {/* { path === "Sphere" ? */}
                    <>
                        <Link id={openTab === "Events" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Sphere", "Events"])} to="/Events" className={style.sub_items}>Events</Link>
                        <Link id={openTab === "Polls" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Sphere", "Polls"])} to="/Polls" className={style.sub_items}>Polls</Link>
                    </>
                {/* : null } */}

                <Link id={path === "Arena" ? style.selected_path : null}  onClick={() => clickedMainTab("Arena")} to="/Arena" className={style.nav_items}>Arena</Link>
                {/* { path === "Sphere" ? */}
                    <>
                        <Link id={openTab === "Solo" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Arena", "Solo"])} to="/Solo" className={style.sub_items}>Solo</Link>
                        <Link id={openTab === "Ranked" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Arena", "Ranked"])} to="/Ranked" className={style.sub_items}>Ranked</Link>
                        <Link id={openTab === "Spectate" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Arena", "Spectate"])} to="/Spectate" className={style.sub_items}>Spectate</Link>
                    </>
                {/* : null } */}
                
                <Link id={path === "Mint" ? style.selected_path : null}  onClick={() => clickedMainTab("Mint")} to="/Mint" className={style.nav_items}>Mint</Link>
                {/* { path === "Sphere" ? */}
                    <>
                        <Link id={openTab === "OffRamp" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Mint", "OffRamp"])} to="/OffRamp" className={style.sub_items}>Off Ramp</Link>
                        <Link id={openTab === "Creator Camp" ? style.selected_sub_item : null}  onClick={() => clickedSubTab(["Mint", "Creator Camp"])} to="/Creator Camp" className={style.sub_items}>Creator Camp</Link>


                    </>
                {/* : null } */}
            </div>
        </>
    )
}