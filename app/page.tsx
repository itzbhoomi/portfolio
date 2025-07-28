'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import CurvedLoop from '@/components/CurvedLoop'
import Navbar from '@/components/Navbar'
import SkillsPage from './skills'
import ProjectsGallery from '@/components/ProjectCarousel'
import ModelViewer from '@/components/ModelViewer'
import DotGrid from '@/components/DotGrid'
import useIsMobile from '@/hooks/isMobile'
import Link from 'next/link'
import ChatModal from '@/components/ChatModal'

const roles = ['Full Stack Developer', 'Creative Coder', 'Tech Explorer', 'Problem Solver']

export default function HeroSection() {
  const isMobile = useIsMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isChatModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isChatModalOpen])

  const sampleProjects = [
    {
      title: "Chhapo",
      description:
        "Chhapo is a modern, customizable print-on-demand platform built with Next.js, Tailwind CSS, and Prisma.",
      imageSrc: "/chhapo.png",
      projectUrl: "https://chhapo.vercel.app",
      gitHub: "https://github.com/itzbhoomi/chhapo-web",
      keyFeatures: [
        "Bulk document printing",
        "Gift card and brochure customization",
        "Business card printing",
        "Order tracking system",
        
      ],
      technologies: ["Next.js", "Tailwind CSS", "Prisma", "ShadCN", "Lucide React"],
    },
    {
      title: "The Tasty Trails",
      description:
        "A recipe website with 100+ dishes and category filters, daily highlights, and full instructions.",
      imageSrc: "/thetastytrails.png",
      projectUrl: "https://thetastytrails.vercel.app",
      gitHub: "https://github.com/itzbhoomi/thetastytrails",
      keyFeatures: [
        "Searchable recipe catalog",
        "Top 5 daily picks",
        "Interactive recipe cards",
        "Category filtering and ratings",
      ],
      technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "realityCheque",
      description: "Analytics dashboard with real‑time data visualisations.",
      imageSrc: "/realityCheque.jpeg",
      projectUrl: "https://demo.com/dashboard-a",
      gitHub: "https://github.com/itzbhoomi/realityCheque",
      keyFeatures: [
        "Visual tracking of expenses",
        "Category-wise budget stats",
        "Real-time graph updates",
        "Dark/light mode UI",
      ],
      technologies: ["Next.js", "Tailwind CSS", "Recharts", "TypeScript"],
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
          <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 md:p-16 w-full max-w-4xl">
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
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
              >
                Talk to my chatbot to know more about me
              </button>

              <a
                href="/Bhoomi_Resume.pdf"
                download
                className="bg-gradient-to-r from-purple-500 to-pink-400 text-white text-base px-6 py-3 rounded-full shadow-md hover:scale-105 transition inline-block"
              >
                Resume
              </a>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 h-[250px] sm:h-[350px] md:h-[450px] flex justify-center items-center">
            <div className="w-full h-full">
              <ModelViewer />
            </div>
          </div>
        </div>

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

        <div className="pb-32 sm:pb-48">
          <SkillsPage />
        </div>

        <div className="mt-[-80px] sm:mt-[-150px] md:mt-[-200px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-800">
              Projects
            </span>
          </h1>
          <ProjectsGallery projects={sampleProjects} />
        </div>
      </div>

      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
    </section>
  )
}
