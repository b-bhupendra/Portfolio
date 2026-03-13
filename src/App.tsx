import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { theme } from './theme';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import SkillsPage from './components/SkillsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import ExperienceSection from './components/ExperienceSection';
import AboutSection from './components/AboutSection';
import StarBackground from './components/StarBackground';
import GridBackground from './components/GridBackground';
import IntroAnimation from './components/IntroAnimation';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HeroSection /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutSection /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><ExperienceSection /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><SkillsSection /></PageTransition>} />
        <Route path="/projects/:projectId" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
        <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showIntro && (
        <IntroAnimation 
          onComplete={() => setShowIntro(false)} 
          onSplashStart={() => {}}
        />
      )}
      <Router>
        <ScrollToTop />
        <StarBackground />
        <GridBackground />
        <GlobalStyles
          styles={{
            html: { scrollBehavior: 'smooth' },
            body: { 
              overflowX: 'hidden',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }
          }}
        />
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
