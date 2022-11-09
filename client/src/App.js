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

import Game from './Components/Game';

import Arena from './Components/Arena';
import Mint from './Components/Mint';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Logout from './Components/Logout';
import DashRight from './Components/DashRight';
import DashRightUserless from './Components/DashRightUserless';
import DashLeft from './Components/DashLeft';
import DashLeftUserless from './Components/DashLeftUserless';

// ITEM GETS A WHOLE PAGE
import Collection from './Components/Collection';

export default function App() {
  const [user, setUser] = useState(null);
  const [ path , setPath ] = useState("")
  const [theme, setTheme] = useState('dark');
  const [ currentGame , setCurrentGame ] = useState(null);

  // auto-login
  useEffect(() => { fetch("/me").then((r) => { if (r.ok) { r.json().then((user) => setUser(user))}})}, []);

  return (
    <div id="theme_container" className={user ? user.site_theme : theme}>

        { !currentGame ?
        <div id="header_container">
          <Header />
        </div>
        : null }

        <div id="nav_main_and_dash_container">
          
          { !currentGame ?
          <div id="nav_and_left_dash_container">
            <NavBar path={path} setPath={setPath} user={user} />

            { user ?
            <DashLeft user={user} />
            :
            <DashLeftUserless /> }
          </div>
        : null }

        <div id="main_content">
          <Routes>
            <Route path="/play/:gameType/:gameURL" element={
              <Game setCurrentGame={setCurrentGame}/>
            } />

            <Route path="/" element={<Home />} />
              <Route path="/Browse" element={<Browse />} />
              <Route path="/Themes" element={<Themes />} />
              <Route path="/Resources" element={<Resources />} />
              <Route path="/Forums" element={<Forums />} />

            <Route path="/Sphere" element={<Planetariyum />} />
              <Route path="/Feed" element={<SocialFeed />} />


            <Route path="/Arena" element={<Arena setCurrentGame={setCurrentGame} />} />
            <Route path="/Mint" element={<Mint />} />

            {/* USER PROFILES */}
            <Route path="u/:u" element={<Profile user={user} />} />

            {/* THINGS THAT GET A WHOLE PAGE */}
            <Route path="sets/:c" element={<Collection />} />

            {/* ACCOUNT CREATION */}
            <Route path="/signup" element={<SignUp user={user} setUser={setUser} />} />
            <Route path="/login" element={<Login user={user} setUser={setUser} />} />
            <Route path="/logout" element={<Logout user={user} setUser={setUser} />} />
          </Routes>
        </div>
        { !currentGame ?
        <>
          { user ?
          <DashRight setUser={setUser} user={user} setPath={setPath} />
          :
          <DashRightUserless />
          }
        </>
        : null }
      </div>


    </div>
  );
}