import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/presentacion">Presentación</Link>
      <Link to="/modelo">Modelo</Link>
      <Link to="/conocenos">Conócenos</Link>
      <Link to="/segmentar">Segmentar Imagen</Link>
    </div>
  );
}

export default Navbar;
