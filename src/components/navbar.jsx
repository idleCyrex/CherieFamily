import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/img/Cherie2.png";
import { useTranslation } from "react-i18next";

const languageFlags = {
  en: "https://flagcdn.com/w20/gb.png",
  fr: "https://flagcdn.com/w20/fr.png",
  es: "https://flagcdn.com/w20/es.png",
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || "en";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbarcontainer">
          {/* Logo */}
          <div className="navbarleft">
            <a href="/">
              <img src={logo} alt="logo" className="logo unselectable" />
            </a>
          </div>

          {/* Desktop menu */}
          <div className="navbarright pc">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              offset={-window.innerHeight / 4}
            >
              {t("home")}
            </Link>
            <Link
              to="second"
              smooth={true}
              duration={500}
              offset={-window.innerHeight / 3}
            >
              {t("about")}
            </Link>
            <a href="/Menu Cherie at Sea.pdf" download="Menu Cherie at Sea.pdf">
              {t("menu")}
            </a>
            <Link
              to="forth"
              smooth={true}
              duration={500}
              offset={-window.innerHeight / 4}
            >
              {t("contact")}
            </Link>

            {/* Language Dropdown */}
            <div className="lang-dropdown">
              <button className="lang-button" onClick={toggleLangDropdown}>
                <img
                  src={languageFlags[currentLanguage]}
                  alt={currentLanguage}
                  className="current-flag"
                />
                <span className={`arrow ${isLangDropdownOpen ? "open" : ""}`}>&#9662;</span>
              </button>
              {isLangDropdownOpen && (
                <div className="lang-menu">
                  {Object.entries(languageFlags).map(([lng, flagUrl]) => (
                    <div key={lng} onClick={() => changeLanguage(lng)}>
                      <img src={flagUrl} alt={lng} />
                      {lng.toUpperCase()}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="navbarrightright mobile">
            <button
              className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}
              onClick={toggleMobileMenu}
            >
              &#9776;
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu fade-in">
          <button className="close-button" onClick={toggleMobileMenu}>
            &times;
          </button>
          <div className="mobile-menu-links">
            <Link
              to="hero"
              smooth={true}
              duration={500}
              offset={-window.innerHeight / 4}
              onClick={toggleMobileMenu}
            >
              {t("home")}
            </Link>
            <Link
              to="second"
              smooth={true}
              duration={500}
              offset={-window.innerHeight / 3}
              onClick={toggleMobileMenu}
            >
              {t("about")}
            </Link>
            <a
              href="/Menu Cherie at Sea.pdf"
              download="Menu Cherie at Sea.pdf"
              onClick={toggleMobileMenu}
            >
              {t("menu")}
            </a>
            <Link
              to="forth"
              smooth={true}
              duration={500}
              offset={-window.innerHeight / 4}
              onClick={toggleMobileMenu}
            >
              {t("contact")}
            </Link>

            {/* Mobile flags */}
            <div className="flags mobile-flags">
              {Object.entries(languageFlags).map(([lng, flagUrl]) => (
                <img
                  key={lng}
                  src={flagUrl}
                  alt={lng}
                  onClick={() => {
                    changeLanguage(lng);
                    toggleMobileMenu();
                  }}
                  className="flag-icon"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
