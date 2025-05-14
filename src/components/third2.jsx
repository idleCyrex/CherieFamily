import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import banana from '../assets/img/blueberry.jpg';
import blueberry from '../assets/img/mango.jpg';
import cherry from '../assets/img/tomato.jpg';
import filed from "../assets/img/field.jpg";
const menuItems = [
  { img: banana, title: 'Berries', desc: 'ecologically certified' },
  { img: blueberry, title: 'Exotic fruits', desc: 'ecologically certified' },
  { img: cherry, title: 'Veggies', desc: 'ecologically certified' },
];

function Third() {
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const imageRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

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

  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          cardsObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardsRef.current[0]) {
      cardsObserver.observe(cardsRef.current[0]);
    }

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) cardsObserver.unobserve(card);
      });
    };
  }, []);

  useEffect(() => {
    if (cardsVisible) {
      const timeout = setTimeout(() => {
        setImageVisible(true);
      }, 1000); // Wait for the last card animation + delay

      return () => clearTimeout(timeout);
    }
  }, [cardsVisible]);

  return (
    <>
    <div className='thirdwrapper'>
    <div className='rotatewdw waveewada'>
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
    <path fill='#e8ffc3' d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path></svg>
    </div>
      <div className="thirdcontainer backgroundthird">
        <motion.div
          ref={titleRef}
          className="thirdTitler forcecolor"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span>What's on the menu?</span>
        </motion.div>
        <motion.div
          className="thirdcardcontainer"
          initial={{ opacity: 0, y: 50 }}
          animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <Swiper
            slidesPerView={'3'}
            centeredSlides={true}
            spaceBetween={30}
            initialSlide={1}
            allowTouchMove={false}
            allowSlidePrev={false}
            allowSlideNext={false}
            modules={[EffectCoverflow]}
            className="mySwiper thirdca"
          >
            {menuItems.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="thirdcards " ref={(el) => (cardsRef.current[index] = el)}>
                  <div className='thirdcardsimg'>
                    <img src={item.img} alt={item.title} />
                  </div>
                  <span className='thirdcardstitle forcecolor'>{item.title}</span>
                  <span className='thirdcardsdesc forcecolor'>{item.desc}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      <div className='waveewada'>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path fill='#e8ffc3' d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path></svg>

      </div>
      </div>
      {/*<motion.div
        className="secondImageContainer"
        ref={imageRef}
        initial={{ opacity: 0, y: 50 }}
        animate={imageVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src={filed} alt="filed" />
      </motion.div> */}
    </>
  );
}

export default Third;