import React from "react";
import cheireimg1 from "../assets/img/Cherie1.png";
import cheireimg2 from "../assets/img/Cherie2.png";
import Navbar from "./navbar";
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
          <div className="hero-first">
            <span className="fade-in-delay centeeeer">{t("welcome")}</span>
            <div className="hero-images fade-in">
              <img src={cheireimg1} alt="cheire" className="ig1" />
              <img src={cheireimg2} alt="cheire" className="hero-img" />
            </div>
          </div>
          <div className="hero-second fade-in-delay">
            <a
              href="/Menu Cherie at Sea.pdf"
              download="Menu Cherie at Sea.pdf"
            >
              <button className="button">
                <span>{t("order")}</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
