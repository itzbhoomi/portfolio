'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const roles = ['Full Stack Developer', 'Creative Coder', 'Tech Explorer', 'Problem Solver']

export default function IntroPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-20 py-20">
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg text-center"
      >
        Hi,<br /> I’m{' '}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-800">
          Bhoomi
        </span>
      </motion.h1>

      <motion.p
        key={roles[currentIndex]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl sm:text-2xl mt-4 text-black font-semibold drop-shadow text-center"
      >
        {roles[currentIndex]}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-base sm:text-lg mt-6 text-black max-w-2xl text-center"
      >
        Full-stack developer passionate about building fast, scalable, and interactive web experiences. From backend systems to beautiful UI and 3D interactions — I turn ideas into smooth, real-time digital products.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap justify-center gap-4 mt-8"
      >
        <Button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
          View My Work
        </Button>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
          Contact Me
        </Button>
      </motion.div>
    </div>
  )
}