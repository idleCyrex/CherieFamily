import React, { useState } from 'react';
import { Link } from 'react-scroll';
import logo from '../assets/img/Cherie2.png';
import { Analytics } from "@vercel/analytics/react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbarcontainer">
          <div className="navbarleft">
            <a href="/">
              <img src={logo} alt="logo" className='logo unselectable' />
            </a>
          </div>
          <div className="navbarright pc">
            <Link to="hero" smooth={true} duration={500} offset={-window.innerHeight / 4}>Home</Link>
            <Link to="second" smooth={true} duration={500} offset={-window.innerHeight / 3}>About Us</Link>
            
            {/* Menu now downloads PDF */}
            <a 
              href="/Menu Cherie at Sea.pdf" 
              download="Menu Cherie at Sea.pdf"
            >
              Menu
            </a>

            <Link to="forth" smooth={true} duration={500} offset={-window.innerHeight / 4}>Contact Us</Link>
          </div>

          <div className="navbarrightright mobile">
            <button className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
              &#9776;
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu fade-in">
          <button className="close-button" onClick={toggleMobileMenu}>&times;</button>
          <div className="mobile-menu-links">
            <Link to="hero" smooth={true} duration={500} offset={-window.innerHeight / 4}>Home</Link>
            <Link to="second" smooth={true} duration={500} offset={-window.innerHeight / 3}>About Us</Link>

            {/* Same for mobile menu */}
            <a 
              href="/Menu Cherie at Sea.pdf" 
              download="Menu Cherie at Sea.pdf"
            >
              Menu
            </a>

            <Link to="forth" smooth={true} duration={500} offset={-window.innerHeight / 4}>Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
