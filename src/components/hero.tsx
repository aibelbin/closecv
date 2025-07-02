'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);

  // Track scroll progress relative to the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Image motion (moves up and fades in)
  const imageY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.8, 1]);

  // Text motion (fades in and zooms out)
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0.5, 1]);
  const textScale = useTransform(scrollYProgress, [0, 0.3, 1], [2, 1.2, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[200vh] bg-black overflow-hidden"
    >
      {/* Image in the background */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-0">
        <motion.img
          src="/no_bg.png"
          alt="Aibel"
          className="w-[300px] object-contain"
          style={{ y: imageY, opacity: imageOpacity }}
        />
      </div>

      {/* Emerging Stroke Text */}
      <motion.h1
        className="text-[180px] font-extrabold text-transparent text-center z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          WebkitTextStroke: '2px white',
          opacity: textOpacity,
          scale: textScale,
        }}
      >
        AIBEL
      </motion.h1>
    </section>
  );
}
