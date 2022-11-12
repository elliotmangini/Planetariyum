import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";



export default function SignUp ({ setCurrentGame, dimUI, setDimUI, user, setUser, isLogout }) {
  const [sequence , setSequence ] = useState(0);
  // console.log({ sequence })
  // console.log("user" + user)
  // console.log("url save" + user.avatar_url)

  useEffect(() => {
    setDimUI("opacity_100")
    setCurrentGame(null);
  },[])


  // refresh helper
  useEffect(() => {
    // console.log("useEffect firing")
    if (user) {
      if (!user.avatar_url) {
        setSequence(2);
      }
    }
  }, [user]);

  return (
    <>
        { !user ? <SignUp1 setCurrentGame={setCurrentGame} dimUI={dimUI} setDimUI={setDimUI} setSequence={setSequence} user={user} setUser={setUser} /> : null}
        
        {/* BACKWARD PATH */}
        {/* Encourage Avatar Upload, Allow Refresh, Make Unusable if steps completed */}
        { user ? <>{ (!user.avatar_url || (sequence === 2)) && (sequence !== 3 )? <SignUp2 setCurrentGame={setCurrentGame} dimUI={dimUI} setDimUI={setDimUI} setSequence={setSequence} user={user} setUser={setUser} /> : null }</> : null}


        {/* REFRESH AFTER UPLOADED, OR SKIP, OR CONFIRM */}
        { user ? <>{ user.avatar_url && (sequence !== 2) || sequence === 3 ? <SignUp3 setCurrentGame={setCurrentGame} dimUI={dimUI} setDimUI={setDimUI} setSequence={setSequence} user={user} setUser={setUser} /> : null }</> : null}

        

        {/* FORWARD PATH */}
        {/* { sequence === 5 ? <Navigate to="/" /> : null} */}
    </>
  );
}