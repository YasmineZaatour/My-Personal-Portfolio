import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';
import './NavBar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: 'Home', to: 'home' },
    { title: 'Intro', to: 'intro' },
    { title: 'Skills', to: 'skills' },
    { title: 'Timeline', to: 'timeline' },
    { title: 'Portfolio', to: 'portfolio' },
    { title: 'Certifications', to: 'certifications' },
    { title: 'Contact', to: 'contact' }
  ];

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'nav-open' : ''}`}style={{ height : "75px"}}>
      <div className="navbar-container">
        <Link to="home" className="navbar-logo" smooth={true} duration={500}>
          <span className="logo-text">YZ</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                className="nav-link"
                to={item.to}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
                <span className="nav-link-hover"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
