import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IoPlay, IoPause, IoVolumeHigh, IoVolumeMute, IoExpand } from 'react-icons/io5';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div id="home" className="relative min-h-screen pt-28 pb-20 flex flex-col items-center justify-center overflow-hidden">
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
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 mb-6 border border-primeCyan/40 dark:border-primeCyan/30 rounded-full bg-primeCyan/10 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(46,196,182,0.2)]">
            <span className="text-primeBlue dark:text-primeCyan font-semibold text-xs md:text-sm uppercase tracking-wider">
              Innovation Beyond Limits
            </span>
          </div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 transition-colors duration-300"
          >
            Empowering the Future with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primeBlue via-sky-600 to-primeCyan dark:from-primeBlue dark:via-primeCyan dark:to-white relative inline-block">
              AI & Software Solutions
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primeCyan to-transparent opacity-70 blur-[2px]"></div>
            </span>
          </motion.h1>

          <p className="text-base md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-light leading-relaxed transition-colors duration-300">
            Infinexa Studio engineers autonomous Agentic AI architectures and next-level software platforms.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
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

          {/* Logo Animation Featured Video Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-primeCyan/50 via-primeBlue/30 to-transparent shadow-[0_15px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_50px_rgba(46,196,182,0.25)]">
              <div className="relative rounded-2xl bg-white/95 dark:bg-darkBg/90 backdrop-blur-2xl overflow-hidden p-2 md:p-3 border border-slate-200 dark:border-white/10 transition-colors duration-300">
                {/* Header bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-white/10 mb-2 text-xs font-mono text-slate-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primeCyan animate-ping"></span>
                    <span className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider">Infinexa Studio Official Logo Reveal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={toggleMute}
                      title={isMuted ? "Unmute" : "Mute"}
                      className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {isMuted ? <IoVolumeMute className="text-base" /> : <IoVolumeHigh className="text-base text-primeCyan" />}
                    </button>
                    <button 
                      onClick={togglePlay}
                      title={isPlaying ? "Pause" : "Play"}
                      className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {isPlaying ? <IoPause className="text-base text-primeCyan" /> : <IoPlay className="text-base" />}
                    </button>
                    <button 
                      onClick={() => setShowModal(true)}
                      title="Fullscreen Modal"
                      className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <IoExpand className="text-base" />
                    </button>
                  </div>
                </div>

                {/* Video Container */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black group cursor-pointer" onClick={togglePlay}>
                  <video
                    ref={videoRef}
                    src="/logo_animation.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle hover play overlay if paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primeCyan/90 text-darkBg flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(46,196,182,0.8)]">
                        <IoPlay className="ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
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
