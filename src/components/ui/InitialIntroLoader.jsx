import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const IMAGE =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80';

export default function InitialIntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('mafth_intro_played_v4')) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const duration = 2800;
    const start = Date.now();

    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(id);
        setTimeout(() => {
          setIsDone(true);
          sessionStorage.setItem('mafth_intro_played_v4', 'true');
          onComplete?.();
        }, 200);
      }
    }, 16);

    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] } }}
          className="fixed inset-0 z-50 bg-brand-950 text-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Background */}
          <div className="absolute inset-0 opacity-30">
            <img
              src={IMAGE}
              alt=""
              className="w-full h-full object-cover brightness-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-950/95" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <Logo size="xl" asLink={false} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.05em' }}
              animate={{ opacity: 1, letterSpacing: '0.25em' }}
              transition={{ duration: 0.8 }}
              className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-widest mb-3"
              
            >
              M A F T H
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs sm:text-sm text-marigold-300 tracking-wider uppercase mb-10"
            >
              10 Departments · 1 Trusted Marketplace
            </motion.p>

            {/* Progress */}
            <div className="w-56 sm:w-72">
              <div className="flex justify-between text-[10px] font-mono text-white/50 mb-2">
                <span>LOADING</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-px w-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-400 to-marigold-400"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}