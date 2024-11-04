// src/App.js
import React from 'react';
import Login from './Login';
import Cadastro from './Cadastro';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Cadastro.js" element={<Cadastro />} />
    </Routes>
  </Router>
  );
}

export default App;
