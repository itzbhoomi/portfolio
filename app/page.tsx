'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Button } from '@/components/ui/button'
import CurvedLoop from '@/components/CurvedLoop'
import Navbar from '@/components/Navbar'
import SkillsPage from './skills'
import ProjectsGallery from '@/components/ProjectCarousel'
import ModelViewer from '@/components/ModelViewer'
import DotGrid from '@/components/DotGrid'

const roles = ['Full Stack Developer', 'Creative Coder', 'Tech Explorer', 'Problem Solver']

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // ⛔ Disable custom cursor or effects on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const sampleProjects = [
    {
      title: "Chhapo",
      description: "Chhapo is a modern, customizable print-on-demand platform built with Next.js, Tailwind CSS, and Prisma.",
      imageSrc: "/chhapo.png",
      projectUrl: "https://chhapo.vercel.app",
    },
    {
      title: "The Tasty Trails",
      description: "A recipe website with 100+ dishes and category filters, daily highlights, and full instructions.",
      imageSrc: "/thetastytrails.png",
      projectUrl: "https://thetastytrails.vercel.app",
    },
    {
      title: "realityCheque",
      description: "Analytics dashboard with real‑time data visualisations",
      imageSrc: "/realityCheque.jpeg",
      projectUrl: "https://demo.com/dashboard-a",
    },
  ];

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden px-4 md:px-20 py-20
        bg-gradient-to-br from-purple-400 via-pink-200 to-blue-400
        ${isMobile ? 'cursor-auto' : 'custom-cursor'}
      `}
    >
      <div className="relative w-full h-full">
        {!isMobile && (
          <DotGrid
            dotSize={10}
            gap={15}
            baseColor="#5227FF"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        )}
        <Navbar />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* 🌟 Hero Content */}
          <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 w-full max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg"
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
              className="text-xl sm:text-2xl mt-4 text-black font-semibold drop-shadow"
            >
              {roles[currentIndex]}
            </motion.p>

            <motion.p
              className="text-base sm:text-lg mt-6 text-black max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Full-stack developer passionate about building fast, scalable, and interactive web experiences. From backend systems to beautiful UI and 3D interactions — I turn ideas into smooth, real-time digital products.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-start gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
                View My Work
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
                Contact me
              </Button>
            </motion.div>
          </div>

          {/* 🧊 3D Model Viewer */}
          <div className="w-full lg:w-1/2 h-[400px] md:h-[500px] flex justify-center items-center">
            <div className="w-full h-full">
              <ModelViewer />
            </div>
          </div>
        </div>

        {/* Curved Marquee */}
        <div className="mt-20">
          <CurvedLoop
            marqueeText="Creativity ✦ Problem Solving ✦ Exploration ✦"
            speed={100}
            curveAmount={250}
            direction="right"
            interactive={true}
            className="custom-text-style"
          />
        </div>

        {/* Skills Section */}
        <div>
          <SkillsPage />
        </div>

        {/* Projects Carousel */}
        <div className="mt-[-150px] md:mt-[-200px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-800">
              Projects
            </span>
          </h1>
          <ProjectsGallery projects={sampleProjects} />
        </div>
      </div>
    </section>
  );
}
