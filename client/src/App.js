import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar'

import './StyleSheets/App.css';

import Planetariyum from './Components/Planetariyum';
import Explore from './Components/Explore';
import Arena from './Components/Arena';
import Mint from './Components/Mint';
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Logout from './Components/Logout';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      
      <NavBar user={user} />
        <Routes>
          <Route path="/Explore" element={<Explore />} />
          <Route path="/" element={<Planetariyum />} />
          <Route path="/Arena" element={<Arena />} />
          <Route path="/Mint" element={<Mint />} />
          <Route path="/Dashboard" element={<Dashboard user={user} />} />


          <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          <Route path="/logout" element={<Logout user={user} setUser={setUser} />} />
        </Routes>
    </>
  );
}