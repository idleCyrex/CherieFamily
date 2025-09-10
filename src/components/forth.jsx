import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';

import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpg';
import img3 from '../assets/img/3.jpg';
import img4 from '../assets/img/4.jpg';
import img5 from '../assets/img/5.jpg';
import img6 from '../assets/img/6.jpg';
import img7 from '../assets/img/7.jpg';

function Forth() {
  const images = [img5, img7, img3, img1, img6, img4, img2];

  return (
    <div className="unselectable">
      <Swiper
        spaceBetween={10} 
        navigation
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
          1440: { slidesPerView: 3.8 },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`img-${index}`}
              className="slidess-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Forth;
