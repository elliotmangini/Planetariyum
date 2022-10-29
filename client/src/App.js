import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './StyleSheets/App.css';

import Landing from './Components/Landing';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

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
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}