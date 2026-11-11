import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { studioImages } from '../../data/images';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = studioImages.heroBanners;

  // Auto slide every 3 seconds (timer restarts after manual navigation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full bg-mist-50 border-b border-mist-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] w-full rounded-2xl overflow-hidden shadow-card bg-brand-800">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover brightness-[0.78]"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-900/55 to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl text-white">
                <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-marigold-300 mb-3">
                  {slides[currentSlide].tag} • {slides[currentSlide].badge}
                </span>

                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 leading-tight">
                  {slides[currentSlide].title}
                </h2>

                <p className="text-xs sm:text-sm text-mist-100 mb-6 font-light max-w-lg leading-relaxed hidden sm:block">
                  {slides[currentSlide].subtitle}. Sold by verified vendors, delivered across India.
                </p>

                <div>
                  <Link
                    to={slides[currentSlide].link}
                    className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 bg-marigold-400 text-black text-xs uppercase tracking-wider font-bold rounded-full hover:bg-marigold-300 transition-all active:scale-95 shadow-lift"
                  >
                    <span>{slides[currentSlide].cta}</span>
                    <span className="font-display">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-3 right-6 flex items-center gap-1.5 z-20">
            <span className="text-[10px] font-bold text-white/70 mr-1 tabular-nums">{String(currentSlide + 1).padStart(2, '0')} / {slides.length}</span>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all rounded-full ${
                  currentSlide === idx ? 'w-6 bg-marigold-400' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

