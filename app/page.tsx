"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
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
import HackathonStats from "@/components/hackathon-stats"
import HeroSection from "@/components/hero-section"
import type { Achievement } from "@/lib/types"
import hackathonsData from "@/data/hackathons.json"
import talksData from "@/data/talks.json"
import researchData from "@/data/research.json"
import projectsData from "@/data/projects.json"


export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorRipples, setCursorRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [hackathonWins, setHackathonWins] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)

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

  // Load data from local JSON
  useEffect(() => {
    try {
      const data = (hackathonsData as unknown as Achievement[])
        .filter(h => h.category === "hackathon")
        .sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"))
      setHackathonWins(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const hackathonStats = [
    { icon: Trophy, value: "6", label: "Hackathons Won" },
    { icon: Award, value: "6", label: "Current Streak" },
    { icon: Users, value: "5", label: "Cities Visited" },
    { icon: Target, value: "2025", label: "Latest Win" },
  ]

  const educationStats = [
    { icon: Mic, value: "3", label: "Speaking Events" },
    { icon: Users, value: "400+", label: "People Reached" },
  ]

  const talks = (talksData as Array<any>).map(t => ({
    title: t.title,
    type: t.type,
    topic: t.topic,
    period: t.period,
    location: t.location,
    audience: t.audience,
    achievements: t.achievements,
    color_gradient: t.color_gradient || "from-blue-400 to-indigo-500"
  }))

  const researchAreas = (researchData as Array<any>).map(r => ({
    title: r.title,
    description: r.description,
    icon: (r.icon_name === 'Users' ? Users : Brain)
  }))

  const projects = (projectsData as Array<any>).map(p => ({
    title: p.title,
    description: p.description,
    tech: p.technologies || p.tech || [],
    link: p.link_url || p.github_url || p.link || '#'
  }))

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

  return (

    
    <div className="bg-black text-white min-h-screen overflow-x-hidden" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      
      <SplashCursor/>
      {/* Navigation */}
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold">
            卡罗琳妮
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
      <HeroSection />

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
              I run on open knowledge and learn everything that I find interesting. I mainly work on Ai development and Research but also interested in Brain computer interfacing, Hardware, 
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
              { icon: Brain, label: "Ai Research", desc: "Upading and working closely with BCI tech" },
              { icon: Microscope, label: "Experimenting", desc: "Learning and developing new ais" },
              { icon: Laptop, label: "Software", desc: "Proficinent in various langauges" },
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
        <HackathonStats />

        {/* Hackathon Wins */}
        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <Card className="bg-gray-900 border-gray-800 p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="h-8 bg-gray-700 rounded mb-4 w-3/4"></div>
                      <div className="h-6 bg-gray-700 rounded mb-3 w-1/2"></div>
                      <div className="h-4 bg-gray-700 rounded mb-4 w-full"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-700 rounded w-16"></div>
                        <div className="h-6 bg-gray-700 rounded w-20"></div>
                        <div className="h-6 bg-gray-700 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
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
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${hackathon.color_gradient || 'from-blue-400 to-purple-500'} opacity-10 rounded-full blur-2xl`}
                  />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                            <Trophy size={28} className="text-yellow-400" />
                          </motion.div>
                          <Badge className={`bg-gradient-to-r ${hackathon.color_gradient || 'from-blue-400 to-purple-500'} text-black font-bold px-3 py-1`}>
                            {hackathon.position}
                          </Badge>
                        </div>

                        <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${hackathon.color_gradient || 'from-blue-400 to-purple-500'} bg-clip-text text-transparent`}>{hackathon.title}</h3>
                        <h4 className={`text-xl mb-3 bg-gradient-to-r ${hackathon.color_gradient || 'from-blue-400 to-purple-500'} bg-clip-text text-transparent font-semibold`}>{hackathon.project_name}</h4>
                        <p className="text-gray-300 mb-4">{hackathon.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hackathon.technologies?.map((tech) => (
                            <Badge key={tech} variant="outline" className={`text-xs bg-gradient-to-r ${hackathon.color_gradient || 'from-blue-400 to-purple-500'} bg-clip-text text-transparent border-gray-600`}>
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
                      <a href={hackathon.link_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className={`bg-transparent text-white border-gray-600 hover:bg-gradient-to-r hover:${hackathon.color_gradient || 'from-blue-400 to-purple-500'} hover:text-black hover:border-transparent transition-all duration-300`}>
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
        )}
      </motion.section>

      {/* Projects Section (moved here after Hackathons) */}
      <motion.section
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-bold mb-12 text-center"
        >
          Projects
        </motion.h2>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <Card className="bg-gray-900 border-gray-800 p-6 h-full">
                  <div className="h-6 bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 w-full"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-700 rounded w-14"></div>
                  </div>
                  <div className="h-10 bg-gray-700 rounded w-full"></div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
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
                    {project.tech?.map((tech: string) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
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
        )}
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

        {/* Talks Timeline (styled similar to Hackathons) */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Speaking Engagements</h3>
          <div className="space-y-8">
            {talks.map((talk, index) => (
              <motion.div
                key={talk.title}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative"
              >
                <Card className="bg-gray-900 border-gray-800 p-8 hover:border-green-500 transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${talk.color_gradient} opacity-10 rounded-full blur-2xl`} />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                            <Mic size={28} className="text-green-400" />
                          </motion.div>
                          <Badge className={`bg-gradient-to-r ${talk.color_gradient} text-black font-bold px-3 py-1`}>
                            {talk.type}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{talk.title}</h3>
                        {talk.topic && (
                          <h4 className="text-lg mb-3 font-semibold text-green-400">{talk.topic}</h4>
                        )}
                        {talk.audience && (
                          <p className="text-gray-300 mb-4">Audience: {talk.audience}</p>
                        )}
                        {talk.achievements?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {talk.achievements.map((achievement: string) => (
                              <Badge key={achievement} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        )}
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
  {/* Projects Section moved up below Hackathons */}

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
          <Button onClick={() => setContactOpen(true)} size="lg" className="text-lg px-8 py-4 bg-white text-black hover:bg-gray-100">
            <Mail className="mr-2" />
            Get In Touch
          </Button>
        </motion.div>

        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent className="bg-gray-950 border-gray-800 text-left">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Contact Details</DialogTitle>
              <DialogDescription className="text-gray-400">
                Reach out directly or drop an email and I'll respond soon.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Email</p>
                <p className="font-mono break-all">aibelbinzacariah@gmail.com</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/in/aibel" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/aibel</a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">GitHub</p>
                <a href="https://github.com/aibelbin" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/aibelbin</a>
              </div>
            </div>
            <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href="mailto:aibelbinzacariah@gmail.com?subject=Let's%20Connect&body=Hi%20Aibel,%20">Email Me</a>
              </Button>
              <Button onClick={() => setContactOpen(false)} className="w-full sm:w-auto bg-white text-black hover:bg-gray-100">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          © 2025 Aibel hates footers.
        </motion.p>
      </motion.footer>
    </div>
  )
}
