import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Flights from './pages/Flights';
import Admin from './pages/Admin';

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  </Router>
);

export default App;