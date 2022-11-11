import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";



export default function SignUp ({ user, setUser, isLogout }) {
  const [sequence , setSequence ] = useState(1);

  return (
    <>
        {/* BACKWARD PATH */}
        {/* Encourage Avatar Upload, Allow Refresh, Make Unusable if steps completed */}
        { user ? <>{ !user.avatar_url || sequence == 2 ? <SignUp2 setSequence={setSequence} user={user} setUser={setUser} /> : null }</> : null}

        { !user ? <SignUp1 setSequence={setSequence} user={user} setUser={setUser} /> : null}

        { sequence == 3 ? <SignUp3 setSequence={setSequence} user={user} setUser={setUser} /> : null}

        

        {/* FORWARD PATH */}
        {/* { sequence === 5 ? <Navigate to="/" /> : null} */}
    </>
  );
}