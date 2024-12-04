import React from 'react';
import { Link } from 'react-scroll';
import './Title.css';

const Title = () => {
  return (
    <nav className="Title">
      <div className="Title-container">
        <Link to="home" className="Title-logo" smooth={true} duration={500}>
          <span className="logo-text">YZ</span>
        </Link>
      </div>
    </nav>
  );
};

export default Title;