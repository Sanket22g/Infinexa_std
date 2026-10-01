import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#050608] border-t border-slate-200/80 dark:border-white/10 pt-16 pb-8 relative overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primeBlue to-transparent opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide mb-4 transition-colors duration-300">
            INFIN<span className="text-primeBlue">EXA</span> Studio
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-sm mb-6 leading-relaxed transition-colors duration-300">
            Building software and AI solutions to create super marketing stories. Our mission is to empower creators and students globally.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent flex items-center justify-center text-slate-700 dark:text-white hover:bg-primeBlue hover:text-white dark:hover:bg-primeBlue transition-all transform hover:-translate-y-1 shadow-sm">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/company/infinexa-studio/?viewAsMember=true" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent flex items-center justify-center text-slate-700 dark:text-white hover:bg-primeBlue hover:text-white dark:hover:bg-primeBlue transition-all transform hover:-translate-y-1 shadow-sm">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-transparent flex items-center justify-center text-slate-700 dark:text-white hover:bg-primeBlue hover:text-white dark:hover:bg-primeBlue transition-all transform hover:-translate-y-1 shadow-sm">
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-semibold mb-6 transition-colors duration-300">Quick Links</h4>
          <ul className="space-y-4 text-slate-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">Home</a></li>
            <li><a href="#about-ai" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">About Us</a></li>
            <li><a href="#projects" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">Projects</a></li>
            <li><a href="#contact" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-semibold mb-6 transition-colors duration-300">Our Projects</h4>
          <ul className="space-y-4 text-slate-600 dark:text-gray-400">
            <li><a href="#projects" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">InfinexaStudio Framework</a></li>
            <li><a href="#projects" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">YourPrompty</a></li>
            <li><a href="#projects" className="hover:text-primeBlue dark:hover:text-primeCyan transition-colors">MeritMap</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 text-center text-slate-500 dark:text-gray-500 text-sm transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} Infinexa Studio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
