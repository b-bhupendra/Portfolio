import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { AnimatePresence } from 'motion/react';
import { theme } from './theme';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import StarBackground from './components/StarBackground';
import ScrollProgress from './components/ScrollProgress';
import GridBackground from './components/GridBackground';
import IntroAnimation from './components/IntroAnimation';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HeroSection />} />
        <Route path="/projects" element={<SkillsSection />} />
        <Route path="/experience" element={<ExperienceSection />} />
        <Route path="/about" element={<AboutSection />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Prevent scrolling while intro is visible
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showIntro]);

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
        <StarBackground />
        <GridBackground />
        <GlobalStyles
          styles={{
            html: { scrollBehavior: 'smooth' },
            body: { overflowX: 'hidden' }
          }}
        />
        <NavBar />
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}
