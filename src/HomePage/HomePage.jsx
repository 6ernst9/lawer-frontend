import React from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';

function HomePage() {
  return (  
    <div className='home-wrapper'>
      <div className='home-container'>
        <h4>Baza de date a</h4>
        <h1>Nuner & Blanco, LLC</h1>
        <div className="buttons">
          <Link to="/add">
            <button type="button">Adaugare</button>
          </Link>
          <Link to="/search">
            <button type="button">Cautare</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomePage;