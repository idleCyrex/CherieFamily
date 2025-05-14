import React, { useEffect, useRef, useState } from 'react'; 
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation } from 'swiper/modules';

import banana from '../assets/img/banana.jpg';
import blueberry from '../assets/img/blueberry.jpg';
import cherry from '../assets/img/cherry.jpg';
import coffee from '../assets/img/coffee.jpg';      
import caco from '../assets/img/caco.png';

const menuItems = [  
  { img: coffee, title: 'Colombian Coffee', desc: 'Available now', pdf: '/coffee.pdf' },
  { img: coffee, title: 'Nicaraguan Coffee', desc: 'Available now', pdf: '/coffeen.pdf' },
  { img: caco, title: 'Cacao Nibs', desc: 'Available now', pdf: '/caco.pdf' },
  { img: banana, title: 'Bananas Onkel', desc: 'Coming up May 2025', pdf: '/bananaonkel.pdf' },
  { img: banana, title: 'Bananas Tucan', desc: 'Coming up May 2025', pdf: '/bananatucan.pdf' },
  { img: blueberry, title: 'Berries', desc: 'Coming up May 2025', pdf: '/Comingsoon.pdf' },
];

function Forth() {
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      id="forth"
      ref={containerRef}
      className="thirdcontainer"
      style={{ position: 'relative', top: 0 }}
    >
      <motion.div
        ref={titleRef}
        className="thirdTitler"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <span>Coming up next...</span>
      </motion.div>

      <motion.div
        className="thirdcardcontainer"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      >
<Swiper
  slidesPerView={"auto"}
  centeredSlides={true}
  spaceBetween={30}
  initialSlide={1} // Set the middle slide as the initial slide
  navigation={true}
  modules={[EffectCoverflow, Navigation]}
  className="mySwiper"
>
          {menuItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="thirdcards"
                onClick={() => window.open(item.pdf, '_blank')}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <div className="thirdcardsimg">
                  <img src={item.img} alt={item.title} />
                  <div className="hoverOverlay">
                    <span>See technical sheet</span>
                  </div>
                </div>
                <span className="thirdcardstitle">{item.title}</span>
                <span className="thirdcardsdesc">{item.desc}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <span className='footerforthcontainer'>From Farm to Market, with Passion.</span>
    </div>
  );
}

export default Forth;
