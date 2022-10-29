import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './StyleSheets/App.css';

import Landing from './Components/Landing'

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}