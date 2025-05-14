import React from "react";
import cheireimg1 from "../assets/img/Cherie1.png";
import cheireimg2 from "../assets/img/Cherie2.png";
import Navbar from "./navbar";
import { Link } from 'react-scroll';

function Hero() {
  return (
    <>
      <Navbar />
      <div id="hero" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <video 
          src="https://raw.githubusercontent.com/idleCyrex/backgroundvideo/main/Video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            zIndex: "-2" 
          }}
        />
        
        <div
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgb(10, 10, 10)", // Fallback color
    background: "linear-gradient(to top, rgb(10, 10, 10), transparent)",
    zIndex: 0,
    pointerEvents: "none",
    willChange: "transform",
  }}
></div>

        <div className="hero-content">
          <div className="hero-first">
            <span className="fade-in-delay">WELCOME TO</span>
            <div className="hero-images fade-in">
              <img src={cheireimg1} alt="cheire" className=" ig1 " />
              <img src={cheireimg2} alt="cheire" className="hero-img " />
            </div>
          </div>
          <div className="hero-second fade-in-delay">
            <Link to="footer" smooth={true} duration={500} offset={-window.innerHeight / 4}>
              <button className="button">
                <span>Contact us</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
