'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="h-screen w-full bg-black text-white flex items-center justify-center">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-6xl font-bold"
      >
        Aibel Bin Zacariah
      </motion.h1>
    </main>
  );
}
