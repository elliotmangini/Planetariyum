import { Navigate } from 'react-router-dom';
import { useState } from 'react';


// I DONT THINK THIS IS BEING USED ANYWHERE

export default function Logout ({ user, setUser }) {
    const [ isLogout , setIsLogout ] = useState(false);

    function handleLogout() {
      fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
            console.log("yoyo");
            setIsLogout(true);
            setUser(null);
        }
      });
    }

    return (
        <>
            {/* FORWARD PATH */}
            { isLogout ? <Navigate to="/" /> : null}

            <button onClick={handleLogout}>Log Out</button>
        </>
    )
}