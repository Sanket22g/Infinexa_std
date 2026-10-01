import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about-ai" className="py-32 relative bg-white dark:bg-darkBg border-t border-slate-200/60 dark:border-white/5 overflow-hidden transition-colors duration-300">
      
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primeBlue/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-white to-slate-100 dark:from-cardBg dark:to-darkBg border border-slate-200 dark:border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-2xl relative overflow-hidden group perspective-[1000px] flex flex-col items-center justify-center transition-colors duration-300">
              
              {/* Spinning 3D Gyroscope/Atom */}
              <motion.div 
                className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8 pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: 360, rotateZ: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {/* Ring 1 - PrimeCyan */}
                <div 
                  className="absolute inset-0 border-4 border-primeCyan rounded-full opacity-70 shadow-[0_0_20px_rgba(46,196,182,0.5)]"
                  style={{ transform: 'rotateX(75deg) rotateY(15deg) translateZ(0)' }}
                />
                {/* Ring 2 - PrimeBlue */}
                <div 
                  className="absolute inset-0 border-4 border-primeBlue rounded-full opacity-70 shadow-[0_0_20px_rgba(11,91,161,0.5)]"
                  style={{ transform: 'rotateX(75deg) rotateY(75deg) translateZ(0)' }}
                />
                {/* Ring 3 - Glass Ring */}
                <div 
                  className="absolute inset-0 border-2 border-slate-400/50 dark:border-white/40 rounded-full opacity-80 backdrop-blur-sm"
                  style={{ transform: 'rotateX(75deg) rotateY(135deg) translateZ(0)' }}
                />
                
                {/* Core Nucleus */}
                <motion.div 
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                   style={{ 
                     background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(46,196,182,1) 60%, rgba(11,91,161,1) 100%)",
                     boxShadow: "0 0 40px rgba(46,196,182,0.8), 0 0 80px rgba(11,91,161,0.6)"
                   }}
                   animate={{ scale: [1, 1.4, 1] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div className="relative z-10 text-center w-full mt-auto">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-wide group-hover:text-primeBlue dark:group-hover:text-primeCyan transition-colors">
                  AI Core Active
                </h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm">
                  Transforming ideas into intelligent realities through cutting-edge models.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xs font-bold tracking-widest uppercase text-primeBlue dark:text-primeCyan mb-4 font-mono">
              About Infinexa Studio
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
              We Don't Just Build Software.<br />
              We Architect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primeBlue via-sky-600 to-primeCyan dark:from-primeCyan dark:to-white">Experiences.</span>
            </h3>
            
            <p className="text-lg text-slate-600 dark:text-gray-400 mb-8 leading-relaxed transition-colors duration-300">
              As the parent company, Infinexa Studio drives innovation across multiple sectors. From AI solutions to educational platforms, our goal is to craft digital products that boast next-level UI/UX and unparalleled functionality. We exist to help people by building solutions that craft super marketing stories.
            </p>

            <ul className="space-y-6">
              {[
                { title: 'Software Engineering', text: 'Robust, scalable, and secure architecture.' },
                { title: 'Futuristic UI/UX', text: 'Micro-interactions, 3D motion, and immersive design.' },
                { title: 'AI Integration', text: 'Prompt creation tools and intelligent predictive models.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 group">
                  <motion.div 
                    whileInView={{ scale: [1, 1.2, 1], boxShadow: ["0px 0px 0px rgba(46,196,182,0)", "0px 0px 20px rgba(46,196,182,0.6)", "0px 0px 0px rgba(46,196,182,0)"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 + (idx * 0.2) }}
                    className="w-8 h-8 rounded-full bg-primeCyan/15 border border-primeCyan/40 text-primeBlue dark:bg-primeCyan/10 dark:border-primeCyan/30 dark:text-primeCyan flex items-center justify-center shrink-0 mt-1 group-hover:bg-primeCyan group-hover:text-slate-900 dark:group-hover:text-darkBg transition-all"
                  >
                    ✓
                  </motion.div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold text-xl mb-1 group-hover:text-primeBlue dark:group-hover:text-primeCyan transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
