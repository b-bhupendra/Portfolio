import React, { useRef } from 'react';
import { Box, Container, Typography, Stack, Button, IconButton, Avatar } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import GridBackground from './GridBackground';
import CustomCursor from './CustomCursor';
import { personalInfo } from '../data';
import { useTheme, alpha } from '@mui/material/styles';

export default function HeroSection() {
  const theme = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 10 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GridBackground />
      <CustomCursor />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div style={{ y: contentY }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pt: { xs: 0, md: 0 } }}>
          <Box sx={{ width: '100%', maxWidth: '900px' }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={textVariants}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 700, 
                    mb: 3, 
                    display: 'inline-block',
                    borderBottom: '2px solid',
                    borderColor: 'primary.main',
                    pb: 0.5,
                    lineHeight: 1,
                  }}
                >
                  AVAILABLE FOR OPPORTUNITIES
                </Typography>
              </motion.div>
              
              <Box sx={{ overflow: 'hidden', mb: 3, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" component="div" sx={{ fontSize: { xs: '3rem', md: '6rem' }, lineHeight: 0.9, letterSpacing: '-0.05em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <motion.div 
                    variants={titleContainerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                  >
                    {"BHUPENDRA".split("").map((char, index) => (
                      <motion.span key={index} variants={letterVariants}>
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.div 
                    variants={titleContainerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: theme.palette.primary.main }}
                  >
                    {"SINGH RAWAT".split("").map((char, index) => (
                      <motion.span key={index} variants={letterVariants}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.div>
                </Typography>
              </Box>

              <motion.div variants={textVariants}>
                <Typography variant="h4" sx={{ mb: 5, color: 'text.secondary', fontWeight: 400, fontSize: { xs: '1.2rem', md: '1.5rem' }, fontFamily: '"Inter", sans-serif', maxWidth: 700, mx: 'auto' }}>
                  {personalInfo.headline}
                </Typography>
              </motion.div>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                <motion.div variants={textVariants}>
                  <Button 
                    component={Link}
                    to="/contact"
                    variant="contained" 
                    size="large" 
                    sx={{
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Get in Touch
                  </Button>
                </motion.div>
                <motion.div variants={textVariants}>
                  <Button 
                    component={Link}
                    to="/experience"
                    variant="outlined" 
                    size="large" 
                    sx={{
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: 'primary.main',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View Work
                  </Button>
                </motion.div>
              </Stack>
              
              <Stack direction="row" spacing={3} sx={{ mt: 8 }} justifyContent="center">
                {[
                  { href: personalInfo.linkedin, icon: <LinkedInIcon /> },
                  { href: `mailto:${personalInfo.email}`, icon: <EmailIcon /> },
                  { href: personalInfo.github, icon: <GitHubIcon /> }
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    variants={textVariants}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton 
                      href={social.href} 
                      target={social.href.startsWith('http') ? "_blank" : undefined} 
                      sx={{ 
                        color: 'text.secondary', 
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2, // Rounded
                        p: 1.5,
                        transition: 'all 0.3s',
                        '&:hover': { 
                          color: 'primary.main', 
                          borderColor: 'primary.main',
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        } 
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Box>
        </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
