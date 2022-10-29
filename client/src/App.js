import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './StyleSheets/App.css';

import Landing from './Components/Landing';
import Login from './Components/Login';

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
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </>
  );
}