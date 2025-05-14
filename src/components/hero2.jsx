  import React, { useEffect } from "react";
  import cheireimg1 from "../assets/img/Cherie1.png";
  import cheireimg2 from "../assets/img/Cherie2.png";
  import Navbar from "./navbar";

  function Hero() {
    useEffect(() => {
      const handleScroll = () => {
        const parallax = document.querySelector('.parallax');
        const movingDiv = document.querySelector('.movingdivscroll');
        let scrollPosition = window.pageYOffset;

        // Parallax effect
        parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;

        // Horizontal scroll effect
        if (scrollPosition <= window.innerHeight) {
          movingDiv.style.transform = `translateX(-${scrollPosition}px)`;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <>
        <Navbar />
        <div className="parallax-container" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
          <video
            className="parallax"
            src="https://raw.githubusercontent.com/idleCyrex/backgroundvideo/main/Video1.mp4"
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

          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top,rgb(10, 10, 10), transparent)",
            zIndex: -1
          }}></div>
          <div className="movingdivscroll">
            <div className="triangle-shape"></div>
            <div className="herotriangleshape">
              <div className="hero-content">
                <div className="hero-first">
                  <span className="fade-in titlehero">From Our </span>
                  <span className="marggintop fade-in titlehero">Fields to</span>
                  <span className="marggintop fade-in titlehero">Your Table</span>
                  <div className="descherowrap">
                    <span className="fade-in-delay deschero">Cherie Exports delivers the finest organic fruits and vegetables, grown in Romania's fertile lands.<br />Experience the purity of nature in every bite.</span>
                  </div>
                </div>
                <div className="hero-second fade-in-delay">
                  <button className="button">Get Started</button>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </>
    );
  }

  export default Hero;