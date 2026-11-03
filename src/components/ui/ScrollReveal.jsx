import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  threshold = 0.15,
}) {
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 36 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1], // Smooth natural deceleration
        },
      },
    },
    'fade-in': {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        },
      },
    },
    'scale-up': {
      hidden: { opacity: 0, scale: 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
    'slide-left': {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    'clip-reveal': {
      hidden: {
        opacity: 0,
        clipPath: 'inset(10% 0 10% 0)',
        scale: 1.05,
      },
      visible: {
        opacity: 1,
        clipPath: 'inset(0% 0 0% 0)',
        scale: 1,
        transition: {
          duration: duration + 0.3,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  };

  const selectedVariant = variants[variant] || variants['fade-up'];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={selectedVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

