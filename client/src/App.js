import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './StyleSheets/App.css';

import Landing from './Components/Landing';
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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/logout" element={<Logout user={user} setUser={setUser} />} />
      </Routes>
      { user ? 
      <>
      <h1>State Shit</h1>
      <p>avatar</p>
      <img src={user.avatar_url}></img>
      </>
      : null }
    </>
  );
}