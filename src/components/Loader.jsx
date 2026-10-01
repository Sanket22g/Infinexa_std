import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onLoadingComplete, 600);
      }
      setProgress(current);
    }, 60);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const handleVideoEnded = () => {
    setProgress(100);
    setTimeout(onLoadingComplete, 400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-darkBg text-slate-900 dark:text-white px-4 overflow-hidden transition-colors duration-300"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(11,91,161,0.15)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(11,91,161,0.25)_0%,_transparent_70%)] pointer-events-none" />

      {/* Skip Button */}
      <motion.button
        onClick={onLoadingComplete}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/15 border border-slate-300 dark:border-white/20 text-xs font-mono text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        <span>Skip Intro</span>
        <IoClose className="text-sm" />
      </motion.button>

      {/* Center Video & Brand Card */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Glowing Video Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden border border-primeCyan/40 bg-black shadow-[0_10px_40px_rgba(11,91,161,0.2)] dark:shadow-[0_0_60px_rgba(46,196,182,0.35)] backdrop-blur-xl group"
        >
          {/* Cyber scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-30" />

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primeCyan z-10" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primeCyan z-10" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primeCyan z-10" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primeCyan z-10" />

          <video
            ref={videoRef}
            src="/logo_animation.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="text-2xl md:text-3xl font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-primeBlue to-primeCyan dark:from-white dark:via-primeCyan dark:to-primeBlue drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(46,196,182,0.5)]">
            INFINEXA STUDIO
          </div>
          <div className="text-xs font-mono tracking-widest text-primeBlue dark:text-primeCyan/80 uppercase mt-1">
            Agentic AI & Next-Gen Software
          </div>
        </motion.div>

        {/* High-tech Progress Bar */}
        <div className="w-64 mt-6">
          <div className="relative h-1.5 bg-slate-200 dark:bg-gray-800/80 rounded-full overflow-hidden border border-slate-300 dark:border-white/10 p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-primeBlue via-primeCyan to-sky-400 rounded-full shadow-[0_0_12px_rgba(46,196,182,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-500 dark:text-gray-400 mt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primeCyan animate-ping" />
              <span>INITIALIZING SYSTEM</span>
            </span>
            <span className="text-primeBlue dark:text-primeCyan font-semibold">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
