import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export default function InitialIntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentPillar, setCurrentPillar] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // 4 curated artisanal preview imagery vignettes
  const craftVignettes = [
    {
      title: "Handloom Linen & Chanderi Silks",
      location: "Weaver Guilds of Varanasi & Jaipur",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Independent Horology & Chronographs",
      location: "Precision Ateliers of Hyderabad",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Wheel-Thrown Stoneware Ceramics",
      location: "Studio Mitti of Pondicherry",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Full-Grain Vegetable Tanned Leather",
      location: "Heritage Tannery of Kanpur",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const pillarStatements = [
    "Weaving Centuries of Lineage: Handloom Silks & Fine Linen of Varanasi & Jaipur",
    "Mechanical Precision & Exhibition Backs: Independent Horology of Hyderabad",
    "High-Fired Mineral Stoneware & Teakwood: Studio Mitti of Pondicherry",
    "Radical Provenance & Fair Trade: Direct from 14 Master Guilds across India",
  ];

  useEffect(() => {
    // Check if animation has already played in this browser session
    const hasPlayed = sessionStorage.getItem('mafth_intro_played_v2');
    if (hasPlayed) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    const duration = 5600; // 5.6 seconds duration (5-6s luxury window)
    const startTime = Date.now();

    // Progress counter (0 to 100)
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      // Cycle text and visual vignettes evenly across the 5.6 seconds
      if (pct < 25) setCurrentPillar(0);
      else if (pct < 50) setCurrentPillar(1);
      else if (pct < 75) setCurrentPillar(2);
      else setCurrentPillar(3);

      if (elapsed >= duration) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem('mafth_intro_played_v2', 'true');
          if (onComplete) onComplete();
        }, 450);
      }
    }, 25);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    sessionStorage.setItem('mafth_intro_played_v2', 'true');
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="luxury-opener"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.05,
              ease: [0.85, 0, 0.15, 1], // Cinematic curtain rise
            },
          }}
          className="fixed inset-0 z-50 bg-[#090909] text-white flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Subtle Ambient Background Vignette with Smooth Crossfade */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPillar}
                src={craftVignettes[currentPillar].image}
                alt="Artisan Preview"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1.02 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.1]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/75 to-[#090909]/90" />
          </div>

          {/* 1. TOP UTILITY BAR */}
          <div className="relative z-10 p-6 sm:p-10 flex items-center justify-between border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-beige-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
              <span>MAFTH MARKETPLACE • EDITION 2026</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block font-mono text-[10px] text-grey-400 uppercase tracking-wider">
                Jaipur • Varanasi • Bengaluru • Pondicherry
              </span>
              <button
                onClick={handleSkip}
                className="px-3 py-1 rounded border border-white/20 text-white/80 hover:text-white hover:border-white text-[11px] font-mono tracking-wider transition-colors flex items-center gap-1"
              >
                <span>SKIP INTRO</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 2. CENTERPIECE: LOGO, TYPOGRAPHY & MORPHING PILLARS */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto">
            {/* Pink Square Tile Logo with Ambient Glow */}
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mb-6 relative group"
            >
              <div className="absolute -inset-2 bg-[#FF007A]/30 rounded-lg blur-xl opacity-60 animate-pulse" />
              <Logo size="xl" asLink={false} className="relative shadow-2xl" />
            </motion.div>

            {/* Serif Brand Wordmark with expanding tracking */}
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-widest uppercase mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              M A F T H
            </motion.h1>

            {/* Gold Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#FFE600] to-transparent mx-auto my-4"
            />

            {/* Dynamic Pillar Text that transitions smoothly */}
            <div className="h-14 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPillar}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.45 }}
                  className="text-xs sm:text-sm md:text-base font-light text-beige-200 tracking-wider uppercase max-w-xl mx-auto"
                >
                  {pillarStatements[currentPillar]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Guild Location pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-beige-300"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>{craftVignettes[currentPillar].location}</span>
            </motion.div>
          </div>

          {/* 3. BOTTOM PROGRESS BAR, METRICS & LUXURY CURTAIN SLIDER */}
          <div className="relative z-10 p-6 sm:p-10 max-w-3xl mx-auto w-full">
            <div className="flex items-end justify-between text-xs font-mono mb-2.5">
              <div className="flex items-center gap-2 text-beige-400 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
                <span>Entering Verified Indian Marketplace</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-white tracking-widest">
                  {progress.toString().padStart(2, '0')}%
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF007A] via-[#FFE600] to-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Bottom mini-pillars navigation markers */}
            <div className="grid grid-cols-4 gap-2 mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-grey-500">
              {['WEAVES & SILKS', 'HOROLOGY', 'CERAMICS', 'LEATHER ATELIER'].map((label, idx) => (
                <div
                  key={idx}
                  className={`text-center truncate transition-colors ${
                    idx === currentPillar ? 'text-[#FFE600] font-semibold' : 'text-grey-500'
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
