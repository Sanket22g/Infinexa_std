import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IoPlay } from 'react-icons/io5';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0.2]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="home" className="relative min-h-screen pt-32 pb-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primeBlue/10 via-white to-white dark:from-primeBlue/20 dark:via-darkBg dark:to-darkBg z-0 pointer-events-none transition-colors duration-300"></div>
      
      {/* 3D Moving Laser Grid Floor */}
      <div className="absolute inset-x-0 bottom-0 top-[35%] perspective-[1000px] z-0 overflow-hidden [mask-image:linear-gradient(to_top,black,transparent)] pointer-events-none">
        <motion.div 
          className="absolute inset-[-150%] bg-[linear-gradient(to_right,#0b5ba115_1px,transparent_1px),linear-gradient(to_top,#0b5ba115_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2ec4b633_1px,transparent_1px),linear-gradient(to_top,#2ec4b633_1px,transparent_1px)] bg-[size:80px_80px]"
          style={{ transformOrigin: 'top center', rotateX: 75 }}
          animate={{ backgroundPositionY: ["0px", "80px"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Dynamic Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.5, 0.25],
          x: [0, 50, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-[400px] h-[400px] bg-primeBlue/15 dark:bg-primeBlue/20 rounded-full blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.15, 0.4, 0.15],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-primeCyan/15 dark:bg-primeCyan/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 mb-6 border border-primeCyan/40 dark:border-primeCyan/30 rounded-full bg-primeCyan/10 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(46,196,182,0.2)]">
            <span className="text-primeBlue dark:text-primeCyan font-semibold text-xs md:text-sm uppercase tracking-wider">
              Innovation Beyond Limits
            </span>
          </div>

          {/* Heading with Animated Logo Video in Background */}
          <div className="relative w-full my-2 flex flex-col items-center justify-center">
            {/* Animated Logo Video Backdrop behind the heading */}
            <div className="absolute inset-0 -top-16 -bottom-16 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
              <div className="relative w-[340px] sm:w-[540px] md:w-[720px] aspect-video flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]">
                <video
                  src="/logo_animation.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain opacity-35 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen scale-110 pointer-events-none select-none transition-all duration-700"
                />
              </div>
            </div>

            <motion.h1 
              className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 transition-colors duration-300 drop-shadow-sm"
            >
              Empowering the Future with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primeBlue via-sky-600 to-primeCyan dark:from-primeBlue dark:via-primeCyan dark:to-white relative inline-block">
                AI & Software Solutions
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primeCyan to-transparent opacity-70 blur-[2px]"></div>
              </span>
            </motion.h1>
          </div>

          <p className="text-base md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed transition-colors duration-300">
            Infinexa Studio engineers autonomous Agentic AI architectures and next-level software platforms.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#projects"
              className="relative px-7 py-3.5 overflow-hidden rounded-full min-w-[170px] group bg-slate-900 dark:bg-white border border-transparent transition-all duration-300 shadow-md hover:shadow-[0_10px_25px_rgba(11,91,161,0.25)] dark:hover:shadow-[0_0_30px_rgba(46,196,182,0.6)] hover:scale-105 inline-block text-center"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primeBlue to-primeCyan pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
              <span className="relative z-10 text-white dark:text-darkBg font-bold text-base group-hover:text-white transition-colors duration-300">
                Explore Projects
              </span>
            </a>

            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3.5 rounded-full min-w-[170px] bg-white dark:bg-primeBlue/20 hover:bg-slate-100 dark:hover:bg-primeBlue/30 text-slate-800 dark:text-white font-semibold text-base border border-slate-300 dark:border-primeCyan/40 hover:border-primeBlue dark:hover:border-primeCyan transition-all duration-300 shadow-sm dark:shadow-[0_0_20px_rgba(46,196,182,0.25)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <IoPlay className="text-primeCyan group-hover:scale-110 transition-transform" />
              <span>Watch Logo Reel</span>
            </button>

            <a 
              href="#contact"
              className="px-6 py-3.5 rounded-full min-w-[150px] text-slate-700 dark:text-gray-300 hover:text-primeBlue dark:hover:text-primeCyan font-semibold text-base border border-slate-300 dark:border-white/20 hover:border-primeBlue dark:hover:border-primeCyan/50 transition-all duration-300 inline-block text-center"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Video Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative max-w-4xl w-full aspect-video bg-black rounded-2xl overflow-hidden border border-primeCyan shadow-[0_0_70px_rgba(46,196,182,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/logo_animation.mp4"
              autoPlay
              controls
              loop
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg border border-white/20 backdrop-blur-md cursor-pointer transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
