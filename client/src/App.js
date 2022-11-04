import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';

import './StyleSheets/App.css';

import Header from './Components/Header';

import Planetariyum from './Components/Planetariyum';
import SocialFeed from './Components/SocialFeed';

import Home from './Components/Home';
import Browse from './Components/Browse';
import Themes from './Components/Themes';
import Resources from './Components/Resources';
import Forums from './Components/Forums';


import Arena from './Components/Arena';
import Mint from './Components/Mint';
import Dashboard from './Components/Dashboard';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Logout from './Components/Logout';
import DashRight from './Components/DashRight';
import DashRightUserless from './Components/DashRightUserless';
import DashLeft from './Components/DashLeft';
import DashLeftUserless from './Components/DashLeftUserless';

export default function App() {
  const [user, setUser] = useState(null);
  const [ path , setPath ] = useState("")

    // // grab default theme from user's browser settings
    // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState('light');

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div id="theme_container" className={user ? user.site_theme : theme}>
      <div id="header_container">
        <Header />
      </div>
      <div id="nav_main_and_dash_container">
      <div id="nav_and_left_dash_container">
        <NavBar path={path} setPath={setPath} user={user} />

        { user ?
        <DashLeft user={user} />
        :
        <DashLeftUserless /> }
      </div>
        <div id="main_content">
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/Browse" element={<Browse />} />
              <Route path="/Themes" element={<Themes />} />
              <Route path="/Resources" element={<Resources />} />
              <Route path="/Forums" element={<Forums />} />





            <Route path="/Sphere" element={<Planetariyum />} />
              <Route path="/Feed" element={<SocialFeed />} />


            <Route path="/Arena" element={<Arena />} />
            <Route path="/Mint" element={<Mint />} />
            <Route path="/Dashboard" element={<Dashboard user={user} />} />


            <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
            <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/logout" element={<Logout user={user} setUser={setUser} />} />
          </Routes>
        </div>
        { user ?
        <DashRight setUser={setUser} user={user} setPath={setPath} />
        :
        <DashRightUserless /> }
      </div>
    </div>
  );
}