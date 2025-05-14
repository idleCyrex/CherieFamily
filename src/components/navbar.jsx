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
            <img src={logo} alt="logo" />
          </div>
          <div className="navbarrightright pc">

          </div>
          <div className="navbarright pc">
            <Link to="hero" smooth={true} duration={500} offset={-window.innerHeight / 4}>Home</Link>
            <Link to="second" smooth={true} duration={500} offset={-window.innerHeight / 3}>About Us</Link>
            <Link to="forth" smooth={true} duration={500} offset={-window.innerHeight / 4}>Products</Link>
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
            <Link to="hero" smooth={true} duration={500} offset={-window.innerHeight / 4} onClick={toggleMobileMenu}>Home</Link>
            <Link to="second" smooth={true} duration={500} offset={-window.innerHeight / 3} onClick={toggleMobileMenu}>About Us</Link>
            <Link to="forth" smooth={true} duration={500} offset={-window.innerHeight / 4} onClick={toggleMobileMenu}>Products</Link>
            <Link to="footer" smooth={true} duration={500} offset={-window.innerHeight / 4} onClick={toggleMobileMenu}>
              <button className="button">
                <span>Contact us</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
