import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "InfinexaStudio",
      category: "Agentic AI Framework",
      desc: "A lightweight, professional Python framework for autonomous multi-agent workflows, native tool-use loops, and decentralized coordination. Built for developers seeking token-efficient agent orchestration.",
      video: "/logo_animation.mp4",
      link: "https://github.com/sanketghadge/InfinexaStudio",
      accent: "from-primeBlue to-primeCyan",
      badge: "Open Source AI"
    },
    {
      title: "YourPrompty",
      category: "AI Platform",
      desc: "An AI prompt-sharing and engineering hub. Discover, copy, and optimize prompts directly with your favorite LLM models. Collaborate with creators and streamline prompt workflows.",
      img: "/yourprompty.jpg",
      link: "#",
      accent: "from-purple-600 to-primeBlue dark:from-purple-500 dark:to-primeBlue",
      badge: "Prompt Hub"
    },
    {
      title: "MeritMap",
      category: "Career & College Predictor",
      desc: "A powerful platform designed for engineering and competitive exam students. Enter scores and preferences to forecast college cutoffs and optimal educational pathways.",
      img: "/meritmap.jpg",
      link: "#",
      accent: "from-primeBlue to-emerald-500 dark:from-primeCyan dark:to-emerald-400",
      badge: "EdTech AI"
    }
  ];

  return (
    <section id="projects" className="py-28 relative bg-slate-100/70 dark:bg-[#090B0F] border-t border-slate-200/80 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-widest uppercase text-primeBlue dark:text-primeCyan mb-3 font-mono"
          >
            Our Masterpieces & Products
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300"
          >
            Flagship <span className="text-transparent bg-clip-text bg-gradient-to-r from-primeBlue via-sky-600 to-primeCyan dark:from-primeBlue dark:via-primeCyan dark:to-white">Innovations</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 25px 50px -15px rgba(11, 91, 161, 0.2)" }}
              className="group relative rounded-3xl p-[1px] overflow-hidden cursor-pointer bg-slate-200/70 dark:bg-transparent shadow-sm dark:shadow-none"
            >
              {/* Glowing animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-b from-primeCyan/40 via-primeBlue/20 to-transparent group-hover:from-primeCyan group-hover:via-primeBlue transition-all duration-500 rounded-3xl" />
              
              {/* Inner Card Wrapper */}
              <div className="relative z-10 bg-white dark:bg-cardBg rounded-[23px] overflow-hidden h-full flex flex-col transition-colors duration-300">
                <div className="h-56 w-full relative overflow-hidden bg-slate-100 dark:bg-black/60 flex items-center justify-center p-4">
                  {p.video ? (
                    <video
                      src={p.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <motion.img 
                      src={p.img} 
                      alt={p.title} 
                      className="w-full h-full object-contain filter brightness-95 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 ease-out"
                      onError={(e) => { e.target.src = "/infinexa_studio.jpg" }}
                    />
                  )}
                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-darkBg/80 border border-slate-200 dark:border-white/10 backdrop-blur-md text-[10px] font-mono text-primeBlue dark:text-primeCyan shadow-sm">
                    {p.badge}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-white dark:bg-cardBg/90 backdrop-blur-md border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${p.accent} mb-1.5`}>
                      {p.category}
                    </p>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primeBlue dark:group-hover:text-primeCyan transition-colors mb-3">
                      {p.title}
                    </h4>
                    <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-4">
                      {p.desc}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-gray-300 group-hover:text-primeBlue dark:group-hover:text-primeCyan transition-colors">
                    <span>Explore Platform</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
