'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  projectUrl: string;
  liveDemoUrl?: string;
}

interface ProjectsGalleryProps {
  projects: Project[];
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects }) => {
  return (
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
          {/* Outer Glow Border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-400/20 to-blue-400/20 pointer-events-none group-hover:blur-sm z-[-1]" />

          {/* Image Box */}
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
            <h3 className="text-white text-lg font-bold mb-1">
              {project.title}
            </h3>
            <p className="text-white/90 text-sm mb-4">
              {project.description}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-auto">
          <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/70 hover:bg-white/30 text-white px-4 py-1.5 text-sm rounded-full transition-all"
            >
              Live Demo ↗️
            </a>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white font-bold  px-4 py-1.5 text-md rounded-full transition-all"
            >
              Details ➡
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsGallery;
