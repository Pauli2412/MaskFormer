import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Presentacion from './components/Presentacion';
import Modelo from './components/Modelo';
import Conocenos from './components/Conocenos';
import SegmentarImagen from './components/SegmentarImagen';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/presentacion" element={<Presentacion />} />
            <Route path="/modelo" element={<Modelo />} />
            <Route path="/conocenos" element={<Conocenos />} />
            <Route path="/segmentar" element={<SegmentarImagen />} />
            <Route path="/" element={<Presentacion />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
