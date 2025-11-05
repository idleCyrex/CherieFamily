
import React, { useEffect, useRef, useState } from 'react';
import './second.css';
import car1 from '../assets/img/car1.jpg';
import car2 from '../assets/img/car2.jpg';
import car3 from '../assets/img/car3.jpg';

const images = [car1, car2, car3];

function Second() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const startXRef = useRef(0);
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    // auto-advance every 5s
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => resetTimeout();
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function prev() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((i) => (i + 1) % images.length);
  }

  // Pointer / touch handlers for swipe
  function onPointerDown(e) {
    isPointerDownRef.current = true;
    // pointer events
    startXRef.current = e.clientX ?? 0;
    try {
      e.currentTarget.setPointerCapture && e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
  }

  function onPointerMove(/* e */) {
    // no-op for now; we only detect swipe on pointer up
  }

  function onPointerUp(e) {
    if (!isPointerDownRef.current) return;
    const endX = e.clientX ?? 0;
    const delta = endX - startXRef.current;
    const threshold = 50; // pixels
    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    }
    isPointerDownRef.current = false;
    try {
      e.currentTarget.releasePointerCapture && e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
  }

  function onPointerCancel() {
    isPointerDownRef.current = false;
  }

  // Fallback touch handlers for platforms without pointer events
  function onTouchStart(e) {
    isPointerDownRef.current = true;
    startXRef.current = e.touches && e.touches[0] ? e.touches[0].clientX : 0;
  }

  function onTouchEnd(e) {
    if (!isPointerDownRef.current) return;
    const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0;
    const delta = endX - startXRef.current;
    const threshold = 50;
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
    isPointerDownRef.current = false;
  }

  return (
    <section className="second-section">
      <div className="second-inner">
        <div className="second-left">
          <h2 className="sec-title">PROJECT REBORN — THE Lorem ipsum</h2>
          <p className="sec-copy">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, necessitatibus?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button className="read-btn" aria-label="Lire la suite">
            CHECK OUR INSTAGRAM
            <span className="read-arrow">›</span>
          </button>
        </div>

        <div className="second-right">
          <div
            className="carousel"
            role="region"
            aria-roledescription="carousel"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: 'pan-y', WebkitUserSelect: 'none', userSelect: 'none' }}
          >
            <button className="arrow left" onClick={prev} aria-label="Précédent">‹</button>

            <div className="slide" aria-label={`Slide ${index + 1}`}>
              <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
              />
            </div>

            <button className="arrow right" onClick={next} aria-label="Suivant">›</button>
          </div>

          <div className="carousel-footer">
            <div className="dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Aller à la diapositive ${i + 1}`}
                />
              ))}
            </div>

            <div className="divider" aria-hidden="true" />

            <a className="all-news" href="#">GET IN CONTACT</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Second;
  