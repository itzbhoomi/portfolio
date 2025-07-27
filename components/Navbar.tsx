'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="backdrop-blur-sm bg-white/20 border border-black/10 shadow-md rounded-full px-6 py-3 flex gap-4">
        {['Skills', 'Work', 'Experience'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-6 py-2 rounded-full text-rose-900 font-medium transition-all duration-300
                       hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400
                       hover:text-white hover:scale-105 shadow-md bg-black/20"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  )
}
