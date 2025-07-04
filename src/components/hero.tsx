'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Map scroll progress (0 to 1) to opacity (0 to 1)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  // Map scroll progress (0 to 1) to scale (1 to 1.5)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);

  return (
    // Section is now taller than the viewport to enable scrolling
    <section ref={targetRef} className="relative h-[200vh] bg-black">
      {/* This container is sticky, so it stays in view while scrolling */}
      <div className="sticky top-0 h-screen flex items-end justify-center overflow-hidden">
        {/* The motion.img uses the transformed scroll values for its style */}
        <motion.img
          style={{ opacity, scale }}
          src="/no_bg.png"
          alt="Aibel"
          className="w-[400px] object-contain origin-bottom"
        />
      </div>
    </section>
  );
}
