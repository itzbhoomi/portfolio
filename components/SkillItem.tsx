'use client'

import { IconType } from "react-icons";

interface SkillItemProps {
  name: string;
  icon: IconType;
}

const SkillItem = ({ name, icon: Icon }: SkillItemProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md hover:scale-105 transition-transform duration-300 shadow-md">
      <Icon className="text-4xl sm:text-5xl text-rose-800 mb-2" />
      <p className="text-black text-sm sm:text-base text-center">{name}</p>
    </div>
  );
};

export default SkillItem;
