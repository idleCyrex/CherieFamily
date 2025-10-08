import React, { useEffect, useState } from "react";
import { Link as ScrollLink, scroller } from "react-scroll";
import logo from "../assets/img/Cherie2.png";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const languageFlags = {
  en: "https://flagcdn.com/w20/gb.png",
  fr: "https://flagcdn.com/w20/fr.png",
  es: "https://flagcdn.com/w20/es.png",
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = i18n.language || "en";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLangDropdown = () => setIsLangDropdownOpen(!isLangDropdownOpen);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
  };

  // helper: offsets per section
  const getOffset = (target) => {
    switch (target) {
      case "second":
        return -window.innerHeight / 3;
      case "hero":
      case "forth":
      default:
        return -window.innerHeight / 4;
    }
  };

  // Navigate to home then scroll to target if not on home
  const handleNavClick = (target) => {
    const isHome = location.pathname === "/";
    if (!isHome) {
      // pass desired section in state and navigate to home
      navigate("/", { state: { scrollTo: target } });
      // close mobile menu if open
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    } else {
      // already on home, scroll smoothly
      scroller.scrollTo(target, {
        smooth: true,
        duration: 500,
        offset: getOffset(target),
      });
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  // After navigating to home with a target in state, perform the scroll
  useEffect(() => {
    const target = location.state && location.state.scrollTo;
    if (location.pathname === "/" && target) {
      // small timeout to ensure layout is ready
      const id = setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: true,
          duration: 500,
          offset: getOffset(target),
        });
      }, 50);
      // clear the navigation state so it doesn't re-trigger
      navigate(location.pathname, { replace: true, state: {} });
      return () => clearTimeout(id);
    }
  }, [location.pathname]);

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
            {location.pathname === "/" ? (
              <>
                <ScrollLink to="hero" smooth={true} duration={500} offset={getOffset("hero")}>
                  {t("home")}
                </ScrollLink>
                <ScrollLink to="second" smooth={true} duration={500} offset={getOffset("second")}>
                  {t("about")}
                </ScrollLink>
              </>
            ) : (
              <>
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("hero"); }}>
                  {t("home")}
                </a>
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("second"); }}>
                  {t("about")}
                </a>
              </>
            )}
            <a href="/Menu Cherie at Sea.pdf" download="Menu Cherie at Sea.pdf">
              {t("menu")}
            </a>
            {location.pathname === "/" ? (
              <ScrollLink to="forth" smooth={true} duration={500} offset={getOffset("forth")}>
                {t("contact")}
              </ScrollLink>
            ) : (
              <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("forth"); }}>
                {t("contact")}
              </a>
            )}

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
            {location.pathname === "/" ? (
              <>
                <ScrollLink to="hero" smooth={true} duration={500} offset={getOffset("hero")} onClick={toggleMobileMenu}>
                  {t("home")}
                </ScrollLink>
                <ScrollLink to="second" smooth={true} duration={500} offset={getOffset("second")} onClick={toggleMobileMenu}>
                  {t("about")}
                </ScrollLink>
              </>
            ) : (
              <>
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("hero"); }}>
                  {t("home")}
                </a>
                <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("second"); }}>
                  {t("about")}
                </a>
              </>
            )}
            <a
              href="/Menu Cherie at Sea.pdf"
              download="Menu Cherie at Sea.pdf"
              onClick={toggleMobileMenu}
            >
              {t("menu")}
            </a>
            {location.pathname === "/" ? (
              <ScrollLink to="forth" smooth={true} duration={500} offset={getOffset("forth")} onClick={toggleMobileMenu}>
                {t("contact")}
              </ScrollLink>
            ) : (
              <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick("forth"); }}>
                {t("contact")}
              </a>
            )}

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
