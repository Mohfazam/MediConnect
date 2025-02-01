"use client"

import { useState, useEffect, useRef } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useVelocity,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from "framer-motion"
import {
  Shield,
  Upload,
  Search,
  FileText,
  Pill,
  MessageCircle,
  Calendar,
  ClipboardList,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

import { Navbar } from "./Navbar"

import { useNavigate } from "react-router-dom"

import female from "../assets/female.svg"
import male from "../assets/male.svg"

const features = [
  {
    icon: Shield,
    title: "Medication Safety Check",
    description: "AI-powered analysis to detect potential drug interactions and side effects.",
  },
  {
    icon: MessageCircle,
    title: "Doctor-Patient Chat",
    description: "Secure messaging platform for direct communication with your healthcare provider.",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduler",
    description: "Easy-to-use interface for booking and managing doctor appointments.",
  },
  {
    icon: ClipboardList,
    title: "Symptom Tracker",
    description: "Log and monitor your symptoms to share accurate information with your doctor.",
  },
  {
    icon: Pill,
    title: "Medication Reminders",
    description: "Set personalized alerts to never miss a dose of your prescribed medications.",
  },
  {
    icon: BookOpen,
    title: "Health Education Library",
    description: "Access to reliable, doctor-approved health information and resources.",
  },
]

const steps = [
  {
    icon: Upload,
    title: "Upload Prescription",
    description: "Snap a photo or upload an image of your prescription.",
  },
  {
    icon: Search,
    title: "AI Analysis",
    description: "Our advanced AI analyzes the prescription for potential issues.",
  },
  {
    icon: FileText,
    title: "Get Insights",
    description: "Receive a detailed report and connect with your doctor if needed.",
  },
]

const testimonials = [
  {
    quote: "This app has revolutionized how I manage my health. The direct line to my doctor is invaluable!",
    author: "Emily R., Patient",
    avatar: female,
  },
  {
    quote: "As a physician, this platform helps me provide more personalized and efficient care to my patients.",
    author: "Dr. James L., Cardiologist",
    avatar: male,
  },
  {
    quote: "The medication reminders have been a game-changer for my elderly parents. It gives me peace of mind.",
    author: "Sarah T., Caregiver",
    avatar: female,
  },
  {
    quote: "The symptom tracker has helped me communicate more effectively with my doctor about my chronic condition.",
    author: "Michael K., Patient",
    avatar: male,
  },
]

const faqItems = [
  {
    question: "How secure is my medical information on MediConnect?",
    answer:
      "We take your privacy seriously. MediConnect uses state-of-the-art encryption and follows all HIPAA guidelines to ensure your medical information is always secure and confidential.",
  },
  {
    question: "Can I use MediConnect with my current healthcare provider?",
    answer:
      "MediConnect is designed to work with a wide range of healthcare providers. You can invite your current doctor to join the platform, or you can find new providers who are already using MediConnect.",
  },
  {
    question: "Is the AI prescription analysis feature FDA approved?",
    answer:
      "While our AI analysis tool is not FDA approved as a diagnostic tool, it is designed to provide helpful insights and flag potential issues for review by healthcare professionals. Always consult with your doctor or pharmacist for medical advice.",
  },
  {
    question: "How often is the Health Education Library updated?",
    answer:
      "Our Health Education Library is continuously updated with the latest medical research and guidelines. We have a team of healthcare professionals who review and update the content regularly to ensure its accuracy and relevance.",
  },
]

const ParallaxText = ({ children, baseVelocity = 100 }) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  )
}

export function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedFAQ, setExpandedFAQ] = useState(null)
  const { scrollYProgress } = useScroll()
  const navigate = useNavigate()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50" style={{ scaleX: scrollYProgress }} />
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {/* Navigation */}
        <Navbar darkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Hero Section */}
        <section
          id="home"
          className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white overflow-hidden"
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
            <div className="md:w-1/2 text-center md:text-left z-10">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Bridging the Gap Between You and Your Doctor
              </motion.h2>
              <motion.p
                className="text-xl mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Experience seamless healthcare management with AI-powered prescription analysis and direct doctor
                communication.
              </motion.p>
              <motion.button
                className="bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-400 font-bold py-3 px-8 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-300 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button onClick={() => navigate("/PrescriptionAnalyzer")}>Get Started</button>
              </motion.button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 relative">
              {/* <motion.img
                src="/placeholder.svg?height=400&width=400"
                alt="MediConnect App Interface"
                className="rounded-lg shadow-2xl z-10 relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              /> */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            </div>
            {/* Floating icons */}
            {[Shield, MessageCircle, Calendar, Pill].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute hidden md:block text-white opacity-50"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: index * 0.5,
                }}
              >
                <Icon size={24} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Parallax Text */}
        <ParallaxText baseVelocity={-5}>MediConnect • Empowering Your Health Journey •</ParallaxText>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
              Empowering Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                >
                  <feature.icon className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-around items-center">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center mb-8 md:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <motion.div
                    className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full mb-4"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <step.icon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="bg-white bg-opacity-10 dark:bg-opacity-5 p-6 rounded-lg backdrop-filter backdrop-blur-lg max-w-2xl mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonials[activeTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[activeTestimonial].author}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-lg italic">"{testimonials[activeTestimonial].quote}"</p>
                      <p className="font-semibold mt-2">- {testimonials[activeTestimonial].author}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="flex justify-center mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === activeTestimonial ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    className="flex justify-between items-center w-full text-left text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200"
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  >
                    <span>{item.question}</span>
                    {expandedFAQ === index ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === index && (
                      <motion.p
                        className="text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Join MediConnect today and take control of your health journey.
            </p>
            <motion.button
              className="bg-blue-600 dark:bg-blue-700 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-blue-400">MediConnect</h3>
                <p className="text-sm text-gray-400">Empowering patient-doctor relationships</p>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="#" className="hover:text-blue-400 transition duration-300">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition duration-300">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition duration-300">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-400 transition duration-300">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mt-8 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} MediConnect. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

const wrap = (min, max, v) => {
  const rangeSize = max - min
  return min + ((((v - min) % rangeSize) + rangeSize) % rangeSize)
}

