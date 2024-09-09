import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import Prediction from './Prediction'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />}  />
        <Route path="/prediction" element={<Prediction />} />  
      </Routes>
    </Router>
  );
}

export default App;
