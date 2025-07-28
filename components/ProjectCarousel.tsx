'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  projectUrl: string;
  gitHub: string;
  liveDemoUrl?: string;
  keyFeatures: string[];
  technologies: string[];
}

interface ProjectsGalleryProps {
  projects: Project[];
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <>
      {/* Projects Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-black/40 border border-white/20 rounded-2xl backdrop-blur-lg shadow-2xl p-6 flex flex-col justify-between group hover:scale-[1.015] transition-transform duration-300"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-400/20 to-blue-400/20 pointer-events-none group-hover:blur-sm z-[-1]" />

            {/* Image */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border border-white/20">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-white text-lg font-bold mb-1">{project.title}</h3>
              <p className="text-white/90 text-sm mb-4">{project.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-auto">
              <a
                href={project.liveDemoUrl || project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/70 hover:bg-white/30 text-white px-4 py-1.5 text-sm rounded-full transition-all"
              >
                Live Demo ↗️
              </a>
              <button
                onClick={() => openModal(project)}
                className="text-white font-bold px-4 py-1.5 text-md rounded-full hover:bg-white/20 transition-all"
              >
                Details ➡
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-black/80 dark:bg-zinc-900 rounded-2xl p-6 max-w-7xl w-full relative shadow-xl flex flex-col lg:flex-row gap-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-4 text-2xl text-white font-bold"
              >
                ×
              </button>

              {/* Left */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-4">{selectedProject.description}</p>

                  {/* Highlights */}
                  <div className="flex gap-4 mb-4">
                    <div className="border border-white/20 rounded-xl px-4 py-2 bg-white/5 text-white text-lg">
                      🚀 {selectedProject.technologies.length} Total Technology
                    </div>
                    <div className="border border-white/20 rounded-xl px-4 py-2 bg-white/5 text-white text-lg">
                      🌟 {selectedProject.keyFeatures.length} Key Features
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white/10 text-white text-md px-3 py-1 rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h2 className="text-white font-bold mb-2">Key Features</h2>
                    <ul className="list-disc pl-5 space-y-1 text-white/90 text-md">
                      {selectedProject.keyFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-4">
                    <a
                      href={selectedProject.liveDemoUrl || selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full transition-all"
                    >
                      Live Demo ↗️
                    </a>
                    <a
                      href={selectedProject.gitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all"
                    >
                      GitHub ➡
                    </a>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex-1 relative h-64 lg:h-auto rounded-xl overflow-hidden border border-white/20">
                <Image
                  src={selectedProject.imageSrc}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsGallery;
