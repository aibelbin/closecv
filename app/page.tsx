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
  Microscope,
  Laptop,
  Menu,
  X,
  Brain,
  Zap,
  Activity,
  Award,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Target,
  GraduationCap,
  Mic,
} from "lucide-react"
import SplashCursor  from "@/components/SplashCursor"


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
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  const hackathonWins = [
    {
      title: "Nasa Space Apps Hackathon",
      position: "1st Place",
      year: "2024",
      location: "Amal Jyothi College of engineering",
      project: "Waste reduction and poverty management software",
      description: "Built a website which lets restaurants donate unsold food at the end of the day to the poor",
      prize: "₹35,000",
      participants: "1200+",
      tech: ["React", "Python", "supabase"],
      color: "from-yellow-400 to-orange-500",
      link: "https://github.com/aibelbin/nasa-space-apps-project", // Replace with actual project link
    },
    {
      title: "Gen AI International Hackathon",
      position: "5th Place",
      year: "2024",
      location: "Online",
      project: "NewsRag",
      description: "AI-powered news generation software",
      prize: "₹65,000",
      participants: "300+",
      tech: ["Next.js", "Hugging Faces", "AWS", "SupaBase"],
      color: "from-blue-400 to-purple-500",
      link: "https://github.com/aibelbin/newsrag", // Replace with actual project link
    },
    {
      title: "TinkHack",
      position: "2nd Place",
      year: "2025",
      location: "Model Engineering College",
      project: "LogiScale",
      description: "Created a map system from scratch with better location provider and heatmaps based on cctv footages",
      prize: "₹25,000",
      participants: "800+",
      tech: ["TypeScript", "Python", "Yolo V8", "SupaBase"],
      color: "from-green-400 to-blue-500",
      link: "https://github.com/aibelbin/logiscale", // Replace with actual project link
    },
    {
      title: "Useless Projects",
      position: "Winner",
      year: "2025",
      location: "Online",
      project: "Appam Thinnam Kuzhi Ennam",
      description: "Created a funny program to read the number of holes in an appam",
      prize: "₹32,000",
      participants: "1500+",
      tech: ["React Native", "Python", "Streamlit", "SupaBase"],
      color: "from-pink-400 to-red-500",
      link: "https://github.com/aibelbin/appam-hole-counter", // Replace with actual project link
    },
  ]

  const hackathonStats = [
    { icon: Trophy, value: "6", label: "Hackathons Won" },
    { icon: Award, value: "6", label: "Current Streak" },
    { icon: Users, value: "5", label: "Cities Visited" },
    { icon: Target, value: "2025", label: "Latest Win" },
  ]

  const talks = [
    {
      title: "Brain Computer Interfacing: The Future of Human-Machine Interaction",
      type: "Technical Talk",
      topic: "Brain Computer Interfacing",
      period: "2024",
      location: "Online",
      audience: "Tech Enthusiasts & Researchers",
      achievements: ["200+ Attendees", "Interactive Q&A", "Technical Deep-dive"],
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Internet of Things: Connecting the Digital World",
      type: "Workshop",
      topic: "IoT & Hardware",
      period: "2024",
      location: "Online",
      audience: "Developers & Engineers",
      achievements: ["150+ Participants", "Live Coding Session", "Hardware Demo"],
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Building Startups: From Idea to Execution",
      type: "Entrepreneurship Class",
      topic: "Startups & Business",
      period: "2024",
      location: "Offline",
      audience: "Aspiring Entrepreneurs",
      achievements: ["50+ Students", "Case Studies", "Pitch Sessions"],
      color: "from-yellow-500 to-blue-500",
    },
  ]

  const educationStats = [
    { icon: Mic, value: "3", label: "Speaking Events" },
    { icon: Users, value: "400+", label: "People Reached" },
  ]

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "SupaBase",
    "Docker",
    "Arduino",
    "IOT",
    "CyberSecurity",
    "Brain Computer Interfacing",
    "Leader",
  ]

  const researchAreas = [
    {
      title: "Non-Invasive Brain Computer Interfacing",
      description: "Developing advanced non-invasive techniques for brain-computer interaction using EEG and other external sensors",
      icon: Brain,
    },
    {
      title: "Cybersecurity for Elderly",
      description: "Protecting elderly populations from social engineering attacks through awareness and technological solutions",
      icon: Users,
    },
  ]

  const projects = [
    {
      title: "WatchApp",
      description: "A watch app for me to budget",
      tech: ["Kotlin", "Jetpack Compose", "ADB", "WearOs"],
      link: "#",
    },
    {
      title: "Hospital Management",
      description: "An Hospital Management tool along with a patient client side specifically tailored for elderly",
      tech: ["React", "Socket.io", "OpenAI", "Node.js"],
      link: "#",
    },
  ]

  return (

    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <SplashCursor/>

      {/* Navigation */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold">
            卢卡
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
            {["About", "Hackathons", "Talks", "Research", "Projects", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                className="hover:text-grey-300 transition-colors text-sm"
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
              {["About", "Hackathons", "Talks", "Research", "Projects", "Skills", "Contact"].map((item) => (
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
           Curious Tinkerer, BCI researcher and an open-source contributer 
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
              I am a curious kid who likes to break a few rules and live unconventionally. I build, I break, I learn 
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I run on open knowledge and learn everything that I find interesting. I am interested in Brain computer interfaces, Robotics, Hardware, 
              and Cyber and network securities. I have wins over various hackathons and ctfs
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              My expertise spreads over a lot of programming languages, but most importantly, I dont have a stack. I just pick a stack, learn and build.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { icon: Code, label: "Hackathons", desc: "Finding Problems, creating solutions" },
              { icon: Brain, label: "Brain Research", desc: "Upading and working closely with BCI tech" },
              { icon: Microscope, label: "Experimenting", desc: "Learning and developing new programs" },
              { icon: Laptop, label: "Hardware", desc: "Proficinent in various langauges" },
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
          Hackathons
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          Breakless hours of code, innovation and pitching.
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

                      <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${hackathon.color} bg-clip-text text-transparent`}>{hackathon.title}</h3>
                      <h4 className={`text-xl mb-3 bg-gradient-to-r ${hackathon.color} bg-clip-text text-transparent font-semibold`}>{hackathon.project}</h4>
                      <p className="text-gray-300 mb-4">{hackathon.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hackathon.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className={`text-xs bg-gradient-to-r ${hackathon.color} bg-clip-text text-transparent border-gray-600`}>
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
                    <a href={hackathon.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className={`bg-transparent text-white border-gray-600 hover:bg-gradient-to-r hover:${hackathon.color} hover:text-black hover:border-transparent transition-all duration-300`}>
                        <ExternalLink size={16} className="mr-2" />
                        View Project
                      </Button>
                    </a>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Talks & Speaking Section */}
      <motion.section
        id="talks"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
        >
          Talks
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto"
        >
          Give and take knowledge
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

        {/* Talks Timeline */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Speaking Engagements</h3>
          <div className="space-y-8">
            {talks.map((talk, index) => (
              <motion.div
                key={talk.title}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                <Card className="bg-gray-900 border-gray-800 p-8 hover:border-green-500 transition-all duration-300 overflow-hidden">
                  {/* Gradient Background */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${talk.color} opacity-10 rounded-full blur-2xl`}
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                            <Mic size={28} className="text-green-400" />
                          </motion.div>
                          <Badge className={`bg-gradient-to-r ${talk.color} text-black font-bold px-3 py-1`}>
                            {talk.type}
                          </Badge>
                        </div>

                        <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${talk.color} bg-clip-text text-transparent`}>{talk.title}</h3>
                        <h4 className={`text-xl text-green-400 mb-3 bg-gradient-to-r ${talk.color} bg-clip-text text-transparent font-semibold`}>{talk.topic}</h4>
                        <p className="text-gray-300 mb-4">Audience: {talk.audience}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {talk.achievements.map((achievement) => (
                            <Badge key={achievement} variant="outline" className={`text-xs bg-gradient-to-r ${talk.color} bg-clip-text text-transparent border-gray-600`}>
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="md:ml-8 mt-4 md:mt-0">
                        <div className="text-right space-y-2">
                          <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                            <Calendar size={16} />
                            <span>{talk.period}</span>
                          </div>
                          <div className="flex items-center justify-end space-x-2 text-sm text-gray-400">
                            <MapPin size={16} />
                            <span>{talk.location}</span>
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
          Exploring the intersection of neurotechnology and cybersecurity through innovative research
        </motion.p>

        {/* Research Areas */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
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
                <h3 className="text-xl font-bold mb-3 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{area.title}</h3>
                <p className="text-gray-200 mb-4 text-center">{area.description}</p>
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
            { icon: Users, value: "2", label: "Active Projects" },
            { icon: Brain, value: "1", label: "Patent Pending" },
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
                <motion.h3 whileHover={{ scale: 1.05 }} className="text-xl font-bold mb-3 text-white">
                  {project.title}
                </motion.h3>
                <p className="text-white mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-white border-gray-600 hover:bg-white hover:text-black transition-colors"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Project
                    </Button>
                  </a>
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
          © 2024 Aibel hates footers.
        </motion.p>
      </motion.footer>
    </div>
  )
}
