import React from "react";
import cheireimg1 from "../assets/img/Cherie1.png";
import cheireimg2 from "../assets/img/Cherie2.png";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div
        id="hero"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          src="/Video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="heroo"
        />

        <div className="herooooo"></div>

        <div className="hero-content">
          <div style={{ marginBottom: '130px'}}>
            <button to="/play" className="play-button">PLAY FOR FREE</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
