"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"

type Project = {
  title: string
  description: string
  imageSrc: string
  projectUrl: string
  keyFeatures: string[]
  technologies: string[]
}

type ProjectModalProps = {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
}

export default function ProjectModal({ selectedProject, setSelectedProject }: ProjectModalProps) {
  const closeModal = () => {
    setSelectedProject(null)
  }

  // 🚫 Disable scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedProject])

  if (!selectedProject) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-2xl p-6 max-w-7xl w-full relative shadow-xl flex flex-col lg:flex-row gap-8"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {/* ❌ Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300"
          >
            <X className="h-6 w-6" />
          </button>

          {/* 🖼️ Project Image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 h-64 lg:h-auto relative rounded-lg overflow-hidden">
            <Image
              src={selectedProject.imageSrc}
              alt={selectedProject.title}
              fill
              className="object-cover"
            />
          </div>

          {/* 📄 Project Info */}
          <div className="flex flex-col justify-between gap-6 w-full lg:w-1/2">
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
              <p className="text-sm text-zinc-400 mb-4">{selectedProject.description}</p>

              {/* 🌟 Key Features */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-1">Key Features</h3>
                <ul className="list-disc list-inside text-sm text-zinc-300 space-y-1">
                  {selectedProject.keyFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* 🛠️ Technologies */}
              <div>
                <h3 className="font-semibold text-lg mb-1">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-800 text-white px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 🔗 Project Link */}
            <a
              href={selectedProject.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-white dark:bg-black border border-zinc-700 px-4 py-2 rounded text-sm font-medium text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              Visit Project →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
