"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Static background - no scroll effects for now */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400 rounded-full blur-3xl" />
      </div>

      {/* Hero Text - Static and reliable */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10"
      >
        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold mb-6">
          {"Aibel Bin Zacariah".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-8">
          Curious Tinkerer, BCI researcher and an open-source contributor 
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-12">
          {[
            { Icon: Github, link: "https://www.github.com/aibelbin" },
            { Icon: Linkedin, link: "https://www.linkedin.com/in/aibel-bin-zacariah-677660226/" },
            { Icon: Mail, link: "aibelbinzacariah@gmail.com" },
          ].map(({ Icon, link }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 border border-gray-700 rounded-full hover:border-white transition-colors"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown size={32} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
