
import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-main">
        <div className="footer-left">
          <div className="signature">Rebirth</div>
          <p className="sig-desc">Lorem ipsum, dolor sit adipisicing elit. Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div className="footer-middle">
          <h4>Links</h4>
          <ul>
            <li><a href="#services">Home</a></li>
            <li><a href="#appointment">About Us</a></li>
            <li><a href="/terms">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact us</h4>
          <ul className="contact-list">
            <li>
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>contact@reborn.com</span>
            </li>
            <li>
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span aria-label="Phone number">+1 (503) 555-0199</span>
            </li>
            <li>
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>128 Orchard Lane, Portland</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 RoCars - All rights reserved</p>
        <div className="socials">
          <a aria-label="Instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <span className="sr-only">Instagram</span>
          </a>
          <a aria-label="Facebook" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <span className="sr-only">Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
