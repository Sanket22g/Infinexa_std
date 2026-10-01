import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/85 dark:bg-darkBg/85 backdrop-blur-lg shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-slate-200/80 dark:border-white/10" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Animated Video Logo + Brand Name */}
        <a href="#home" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden border border-primeCyan/40 shadow-[0_0_15px_rgba(46,196,182,0.3)] group-hover:shadow-[0_0_25px_rgba(46,196,182,0.7)] group-hover:border-primeCyan transition-all duration-300 bg-black flex-shrink-0">
            <video
              src="/logo_animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-primeCyan transition-colors">
              INFINEXA <span className="text-primeCyan">STUDIO</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-slate-500 dark:text-gray-400 -mt-1 group-hover:text-primeBlue dark:group-hover:text-gray-200">
              AI Solutions
            </span>
          </div>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Home', 'About AI', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="relative text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-colors py-2 group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primeCyan transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Actions (Theme Toggle + CTA) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 md:p-2.5 rounded-full border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-amber-300 transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? "Switch to White Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? (
              <IoSunnyOutline className="text-lg text-amber-300" />
            ) : (
              <IoMoonOutline className="text-lg text-slate-700" />
            )}
          </button>

          {/* CTA Button */}
          <a 
            href="#contact"
            className="hidden md:inline-block relative px-5 py-2 overflow-hidden rounded-full group bg-primeBlue/10 hover:bg-primeBlue/20 border border-primeBlue/30 hover:border-primeCyan transition-all duration-300"
          >
            <span className="relative z-10 text-sm font-medium text-slate-900 dark:text-white group-hover:text-primeCyan transition-colors">
              Get Started
            </span>
            <div className="absolute inset-0 h-full w-full rotate-45 scale-0 bg-slate-900/5 dark:bg-white/5 group-hover:scale-[2] transition-transform duration-500 ease-in-out"></div>
          </a>

          {/* Mobile menu link */}
          <a href="#projects" className="md:hidden text-primeCyan text-sm font-mono border border-primeCyan/30 px-3 py-1 rounded-full">
            Projects
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
