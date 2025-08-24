import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import cherriess from "../assets/img/cherriess.png";
import filed from "../assets/img/filed2.jpg";

function Second() {
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div id="second" className="secondContainer">
      <motion.div
        ref={titleRef}
        className="secontTitle"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <span>Our roots, your goods</span>
      </motion.div>

      <motion.div
        className='newtextSecondCotainer'
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      >
        <div className='containernewtextSecondCotainer'>
          <span>
            Directly sourced from the fertile farms of <span className='bold'>Colombia</span>, we bring the European market the finest Cavendish bananas, Arabica coffee, Porcelain cacao nibs, and seasonal fruits. We partner with local farmers dedicated to quality and sustainability, ensuring that every product is fresh, ethically grown, and delivered straight from the source.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default Second;
