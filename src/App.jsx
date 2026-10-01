import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AIChatBot from './components/AIChatBot';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <AIChatBot />
      <AnimatePresence>
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-white dark:bg-darkBg min-h-screen text-slate-900 dark:text-white font-sans selection:bg-primeBlue selection:text-white transition-colors duration-300">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
