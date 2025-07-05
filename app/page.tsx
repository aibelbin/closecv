"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Smartphone,
  ArrowDown,
  Menu,
  X,
  Brain,
  Zap,
  Activity,
  BookOpen,
  Award,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Target,
  GraduationCap,
  Mic,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorRipples, setCursorRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const { scrollYProgress } = useScroll()

  // Scroll-based transforms for the cinematic effect
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 0.5, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setCursorRipples((prev) => [...prev, newRipple])

      // Remove ripple after animation
      setTimeout(() => {
        setCursorRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
      }, 1000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [])

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
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const hackathonWins = [
    {
      title: "TechCrunch Disrupt Hackathon",
      position: "1st Place",
      year: "2024",
      location: "San Francisco, CA",
      project: "NeuroLink Dashboard",
      description: "Built a real-time brain-computer interface dashboard for paralyzed patients",
      prize: "$50,000",
      participants: "500+",
      tech: ["React", "Python", "TensorFlow", "WebRTC"],
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "MIT Health Hack",
      position: "1st Place",
      year: "2023",
      location: "Cambridge, MA",
      project: "MindBridge",
      description: "AI-powered mental health companion using EEG signal analysis",
      prize: "$25,000",
      participants: "300+",
      tech: ["Next.js", "PyTorch", "AWS", "MongoDB"],
      color: "from-blue-400 to-purple-500",
    },
    {
      title: "Google Developer Challenge",
      position: "2nd Place",
      year: "2023",
      location: "Mountain View, CA",
      project: "AccessiCode",
      description: "Voice-controlled coding environment for developers with disabilities",
      prize: "$15,000",
      participants: "800+",
      tech: ["TypeScript", "WebAssembly", "GCP", "Firebase"],
      color: "from-green-400 to-blue-500",
    },
    {
      title: "Facebook Global Hackathon",
      position: "3rd Place",
      year: "2022",
      location: "Menlo Park, CA",
      project: "SocialMind",
      description: "AR social platform with emotion recognition and mood tracking",
      prize: "$10,000",
      participants: "1000+",
      tech: ["React Native", "ARKit", "Node.js", "PostgreSQL"],
      color: "from-pink-400 to-red-500",
    },
  ]

  const hackathonStats = [
    { icon: Trophy, value: "12+", label: "Hackathons Won" },
    { icon: Award, value: "4", label: "Current Streak" },
    { icon: Users, value: "8", label: "Cities Visited" },
    { icon: Target, value: "2024", label: "Latest Win" },
  ]

  const education = [
    {
      institution: "Stanford University",
      degree: "Ph.D. in Computer Science",
      specialization: "Brain-Computer Interfaces",
      period: "2020 - 2024",
      location: "Stanford, CA",
      achievements: ["Summa Cum Laude", "Outstanding Research Award", "Teaching Excellence Award"],
      color: "from-red-500 to-orange-500",
    },
    {
      institution: "MIT",
      degree: "M.S. in Electrical Engineering",
      specialization: "Neural Engineering",
      period: "2018 - 2020",
      location: "Cambridge, MA",
      achievements: ["Dean's List", "Research Fellowship", "Best Thesis Award"],
      color: "from-blue-500 to-purple-500",
    },
    {
      institution: "UC Berkeley",
      degree: "B.S. in Computer Science",
      specialization: "AI & Machine Learning",
      period: "2014 - 2018",
      location: "Berkeley, CA",
      achievements: ["Magna Cum Laude", "Phi Beta Kappa", "CS Honor Society"],
      color: "from-yellow-500 to-blue-500",
    },
  ]

  const educationStats = [
    { icon: Mic, value: "25+", label: "Speaking Events" },
    { icon: Users, value: "50K+", label: "People Reached" },
  ]

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Framer Motion",
  ]

  const researchAreas = [
    {
      title: "Neural Signal Processing",
      description: "Advanced algorithms for processing and interpreting brain signals in real-time",
      icon: Activity,
      publications: 8,
    },
    {
      title: "Machine Learning for BCI",
      description: "Deep learning models for decoding neural patterns and motor intentions",
      icon: Brain,
      publications: 12,
    },
    {
      title: "Real-time Control Systems",
      description: "Low-latency systems for translating neural signals into device control",
      icon: Zap,
      publications: 6,
    },
  ]

  const publications = [
    {
      title: "Real-time Motor Imagery Classification using Deep Neural Networks",
      journal: "IEEE Transactions on Neural Systems",
      year: "2024",
      citations: 45,
      type: "Journal Article",
    },
    {
      title: "Adaptive Signal Processing for Non-invasive Brain-Computer Interfaces",
      journal: "Nature Neuroscience Methods",
      year: "2023",
      citations: 78,
      type: "Journal Article",
    },
    {
      title: "Multi-modal BCI System for Paralyzed Patients: A Clinical Study",
      journal: "Journal of Neural Engineering",
      year: "2023",
      citations: 92,
      type: "Clinical Study",
    },
  ]

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
      link: "#",
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat app with AI-powered responses and sentiment analysis",
      tech: ["React", "Socket.io", "OpenAI", "Node.js"],
      link: "#",
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for complex data analysis and reporting",
      tech: ["D3.js", "Python", "FastAPI", "PostgreSQL"],
      link: "#",
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Splash Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        {/* Main cursor splash */}
        <motion.div
          className="w-8 h-8 rounded-full bg-blue-400 opacity-60"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Splash droplets */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-300 opacity-40"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 20, 0],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 20, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Click Ripples */}
      <AnimatePresence>
        {cursorRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-12 h-12 border-2 border-blue-400 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold">
            Portfolio
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>

          <div className="hidden md:flex space-x-4">
            {["About", "Hackathons", "Education", "Research", "Projects", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="hover:text-gray-300 transition-colors text-sm"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4"
            >
              {["About", "Hackathons", "Education", "Research", "Projects", "Skills", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ x: 10 }}
                  className="block hover:text-gray-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-400 rounded-full blur-3xl" />
        </motion.div>

        {/* Hero Text with Zoom and Fade Effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
        >
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-bold mb-6">
            {"John Doe".split("").map((char, index) => (
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
            Full Stack Developer & BCI Researcher
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-12">
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
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

      {/* About Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 max-w-4xl mx-auto relative z-10 bg-black"
      >
        <motion.h2
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a passionate full-stack developer with 5+ years of experience creating digital experiences that
              combine beautiful design with powerful functionality.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I specialize in React, Next.js, and modern web technologies, always staying up-to-date with the latest
              trends and best practices in web development.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge with the developer community.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { icon: Code, label: "Clean Code", desc: "Writing maintainable, scalable solutions" },
              { icon: Palette, label: "UI/UX Design", desc: "Creating beautiful user experiences" },
              { icon: Smartphone, label: "Responsive", desc: "Mobile-first approach to development" },
              { icon: ExternalLink, label: "Performance", desc: "Optimized for speed and efficiency" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="p-6 border border-gray-800 rounded-lg text-center hover:border-gray-600 transition-colors"
              >
                <item.icon size={32} className="mx-auto mb-4 text-blue-400" />
                <h3 className="font-semibold mb-2">{item.label}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Hackathons Section */}
      <motion.section
        id="hackathons"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
        >
          Hackathon Victories
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          Turning innovative ideas into award-winning solutions under pressure
        </motion.p>

        {/* Hackathon Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {hackathonStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 border border-gray-800 rounded-lg hover:border-yellow-500 transition-colors"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="mb-3">
                <stat.icon size={32} className="mx-auto text-yellow-400" />
              </motion.div>
              <div className="text-3xl font-bold mb-2 text-yellow-400">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hackathon Wins */}
        <div className="space-y-8">
          {hackathonWins.map((hackathon, index) => (
            <motion.div
              key={hackathon.title}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative"
            >
              <Card className="bg-gray-900 border-gray-800 p-8 hover:border-gray-600 transition-all duration-300 overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hackathon.color} opacity-10 rounded-full blur-2xl`}
                />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                          <Trophy size={28} className="text-yellow-400" />
                        </motion.div>
                        <Badge className={`bg-gradient-to-r ${hackathon.color} text-black font-bold px-3 py-1`}>
                          {hackathon.position}
                        </Badge>
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{hackathon.title}</h3>
                      <h4 className="text-xl text-yellow-400 mb-3">{hackathon.project}</h4>
                      <p className="text-gray-300 mb-4">{hackathon.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hackathon.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="md:ml-8 mt-4 md:mt-0">
                      <div className="text-right space-y-2">
                        <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                          <Calendar size={16} />
                          <span>{hackathon.year}</span>
                        </div>
                        <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                          <MapPin size={16} />
                          <span>{hackathon.location}</span>
                        </div>
                        <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                          <Users size={16} />
                          <span>{hackathon.participants} participants</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">{hackathon.prize}</div>
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-end">
                    <Button variant="outline" className="bg-transparent hover:bg-white hover:text-black">
                      <ExternalLink size={16} className="mr-2" />
                      View Project
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Education & Speaking Section */}
      <motion.section
        id="education"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
        >
          Education
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          Academic excellence and knowledge sharing through education
        </motion.p>

        {/* Education & Speaking Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-6 mb-16 max-w-md mx-auto"
        >
          {educationStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 border border-gray-800 rounded-lg hover:border-green-500 transition-colors"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="mb-3">
                <stat.icon size={32} className="mx-auto text-green-400" />
              </motion.div>
              <div className="text-3xl font-bold mb-2 text-green-400">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education Timeline */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Academic Journey</h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                <Card className="bg-gray-900 border-gray-800 p-8 hover:border-green-500 transition-all duration-300 overflow-hidden">
                  {/* Gradient Background */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${edu.color} opacity-10 rounded-full blur-2xl`}
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                            <GraduationCap size={28} className="text-green-400" />
                          </motion.div>
                          <Badge className={`bg-gradient-to-r ${edu.color} text-black font-bold px-3 py-1`}>
                            {edu.degree}
                          </Badge>
                        </div>

                        <h3 className="text-2xl font-bold mb-2">{edu.institution}</h3>
                        <h4 className="text-xl text-green-400 mb-3">{edu.specialization}</h4>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {edu.achievements.map((achievement) => (
                            <Badge key={achievement} variant="outline" className="text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="md:ml-8 mt-4 md:mt-0">
                        <div className="text-right space-y-2">
                          <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                            <Calendar size={16} />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                            <MapPin size={16} />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Research Section */}
      <motion.section
        id="research"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
        >
          Research
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          Pioneering the future of human-computer interaction through brain-computer interfacing research
        </motion.p>

        {/* Research Areas */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-6 h-full hover:border-purple-500 transition-all duration-300">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="mb-4">
                  <area.icon size={48} className="text-purple-400 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-center">{area.title}</h3>
                <p className="text-gray-400 mb-4 text-center">{area.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen size={16} className="text-purple-400" />
                  <span className="text-sm text-purple-400">{area.publications} Publications</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: BookOpen, value: "26+", label: "Publications" },
            { icon: Award, value: "215+", label: "Citations" },
            { icon: Users, value: "5+", label: "Collaborations" },
            { icon: Brain, value: "3", label: "Patents" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 border border-gray-800 rounded-lg hover:border-purple-500 transition-colors"
            >
              <stat.icon size={32} className="mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Publications */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <h3 className="text-2xl font-bold mb-8 text-center">Recent Publications</h3>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="border border-gray-800 rounded-lg p-6 hover:border-purple-500 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{pub.title}</h4>
                    <p className="text-purple-400 mb-2">{pub.journal}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{pub.year}</span>
                      <span>•</span>
                      <span>{pub.citations} citations</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {pub.type}
                      </Badge>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" size="sm" className="mt-4 md:mt-0 bg-transparent">
                      <ExternalLink size={14} className="mr-2" />
                      View
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-12"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-gray-900 border-gray-800 p-6 h-full hover:border-gray-600 transition-colors">
                <motion.h3 whileHover={{ scale: 1.05 }} className="text-xl font-bold mb-3">
                  {project.title}
                </motion.h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-white hover:text-black transition-colors"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Project
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section - Moved to bottom */}
      <motion.section
        id="skills"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
        >
          Skills
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-wrap justify-center gap-4"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: Math.random() * 10 - 5,
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className="text-lg py-3 px-6 bg-white text-black hover:bg-gray-100 transition-all duration-300 font-medium border-0 shadow-lg">
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          Let's Work Together
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 mb-12"
        >
          Ready to bring your ideas to life? Let's create something amazing together.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-100">
            <Mail className="mr-2" />
            Get In Touch
          </Button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-12 text-center border-t border-gray-800"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
          className="text-gray-500"
        >
          © 2024 John Doe. Crafted with passion and code.
        </motion.p>
      </motion.footer>
    </div>
  )
}
