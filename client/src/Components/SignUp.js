import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";



export default function SignUp ({ user, setUser, isLogout }) {
  const [sequence , setSequence ] = useState(0);
  console.log({ sequence })
  console.log("user" + user)
  // console.log("url save" + user.avatar_url)


  // refresh helper
  useEffect(() => {
    console.log("useEffect firing")
    if (user) {
      if (!user.avatar_url) {
        setSequence(2);
      }
    }
  }, [user]);

  return (
    <>
        { !user ? <SignUp1 setSequence={setSequence} user={user} setUser={setUser} /> : null}
        
        {/* BACKWARD PATH */}
        {/* Encourage Avatar Upload, Allow Refresh, Make Unusable if steps completed */}
        { user ? <>{ !user.avatar_url || sequence === 2 ? <SignUp2 setSequence={setSequence} user={user} setUser={setUser} /> : null }</> : null}


        {/* REFRESH AFTER UPLOADED, OR SKIP, OR CONFIRM */}
        { user ? <>{ user.avatar_url && (sequence !== 2) || sequence === 3 ? <SignUp3 setSequence={setSequence} user={user} setUser={setUser} /> : null }</> : null}

        

        {/* FORWARD PATH */}
        {/* { sequence === 5 ? <Navigate to="/" /> : null} */}
    </>
  );
}