'use client'

import SkillItem from "./SkillItem";
import { skills } from "@/app/utils/skillsData";
import { motion } from "framer-motion";

const SkillsGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-8">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.6 }}
        className="text-center text-4xl sm:text-5xl font-bold text-white mb-12"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-pink-800">
          Tech Skills
        </span>
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="cursor-target"
          >
            <SkillItem name={skill.name} icon={skill.icon} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsGrid;
