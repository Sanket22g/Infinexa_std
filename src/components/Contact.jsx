import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative bg-white dark:bg-darkBg overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-primeBlue/10 dark:bg-primeBlue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
            Let's Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primeBlue via-sky-600 to-primeCyan">Future</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto transition-colors duration-300">
            Ready to craft your next super marketing story? Partner with Infinexa Studio to elevate your digital presence.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href="mailto:hello@infinexastudio.com" 
              className="relative px-8 py-4 overflow-hidden rounded-full min-w-[200px] group bg-slate-900 dark:bg-white text-white dark:text-darkBg text-lg font-bold shadow-lg hover:shadow-[0_10px_25px_rgba(11,91,161,0.3)] transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primeBlue to-primeCyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
              <span className="relative z-10 text-white dark:text-darkBg group-hover:text-white transition-colors">Start a Project</span>
            </a>
            <a 
              href="mailto:hello@infinexastudio.com?subject=Schedule%20a%20Call" 
              className="text-slate-700 dark:text-white text-lg font-medium hover:text-primeBlue dark:hover:text-primeCyan transition-colors cursor-pointer"
            >
              Schedule a Call →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
