"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  ResolvedValues,
} from "framer-motion";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  projectUrl: string;
}

interface RollingGalleryProps {
  projects: Project[];
  autoplay?: boolean;
  pauseOnHover?: boolean;
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
  projects,
  autoplay = false,
  pauseOnHover = false,
}) => {
  const galleryItems = projects;
  const faceCount = galleryItems.length;
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    const check = () => setIsSm(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cylinderWidth = isSm ? 1100 : 1800;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const transform = useTransform(rotation, (v) => `rotateY(${v}deg)`);

  const startSpin = (angle: number) => {
    controls.start({
      rotateY: [angle, angle - 360],
      transition: { duration: 20, ease: "linear", repeat: Infinity },
    });
  };

  useEffect(() => {
    if (autoplay) startSpin(rotation.get());
    else controls.stop();
  }, [autoplay]);

  const handleDrag = (_: any, info: PanInfo) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };
  const handleDragEnd = (_: any, info: PanInfo) => {
    const final = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(final);
    if (autoplay) startSpin(final);
  };

  const handleMouseEnter = () => autoplay && pauseOnHover && controls.stop();
  const handleMouseLeave = () =>
    autoplay && pauseOnHover && startSpin(rotation.get());

  return (
    <div className="relative h-[500px] w-[900px] overflow-hidden">
      {/* fade edges */}
      <div className="absolute top-0 left-0 h-full w-[48px] z-10 bg-gradient-to-l from-transparent to-black/80" />
      <div className="absolute top-0 right-0 h-full w-[48px] z-10 bg-gradient-to-r from-transparent to-black/80" />

      <div className="h-full flex items-center justify-center [perspective:1000px]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          style={{ transform, width: cylinderWidth, transformStyle: "preserve-3d" }}
          className="cursor-grab flex items-center justify-center"
        >
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group absolute flex items-center justify-center"
              style={{
                width: faceWidth + "px",
              }}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="h-[500px] w-[1200px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-white p-4 opacity-0 group-hover:opacity-100"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-4xl mb-4 text-center">{item.description}</p>
                  <motion.a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="bg-pink-500 px-4 py-2 rounded-full"
                  >
                    View Project
                  </motion.a>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
