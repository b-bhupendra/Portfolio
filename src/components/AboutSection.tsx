import React, { useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import ContactSection from './ContactSection';
import { personalInfo } from '../data';

function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection({ compact = false }: { compact?: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Box ref={ref} id="about" sx={{ 
      height: compact ? 'auto' : '100vh',
      minHeight: { xs: '100vh', md: 'auto' },
      display: 'flex',
      alignItems: 'center',
      position: 'relative', 
      overflowY: { xs: 'hidden', md: 'auto' },
      overflowX: 'hidden',
      bgcolor: 'transparent',
      py: { xs: 12, md: 16 },
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      
      {/* Parallax Background Elements */}
      {!compact && (
        <>
          <motion.div style={{ y: y1, opacity, position: 'absolute', top: '10%', right: '5%', zIndex: 0 }}>
            <Box sx={{ width: { xs: 150, md: 300 }, height: { xs: 150, md: 300 }, border: '1px solid', borderColor: 'primary.main', opacity: 0.1, borderRadius: '50%' }} />
          </motion.div>
          <motion.div style={{ y: y2, opacity, position: 'absolute', bottom: '10%', left: '5%', zIndex: 0 }}>
            <Box sx={{ width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 }, bgcolor: 'primary.main', opacity: 0.05, borderRadius: '50%', filter: 'blur(40px)' }} />
          </motion.div>
        </>
      )}

      <Container maxWidth={compact ? false : "lg"} disableGutters={compact} sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, 
          gap: { xs: 6, md: 10 },
          alignItems: 'start'
        }}>
          {/* Left Column: About Text */}
          <Box>
            <FadeInSection>
              <Typography variant="h2" sx={{ 
                mb: { xs: 4, md: 6 }, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                letterSpacing: '-0.02em'
              }}>
                <Box component="span" sx={{ width: 6, height: { xs: 35, md: 45 }, bgcolor: 'primary.main', borderRadius: 1 }} />
                About Me
              </Typography>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Stack spacing={3}>
                  {personalInfo.summary.map((paragraph, index) => (
                    <motion.div key={index} variants={item}>
                      <Typography variant="body1" sx={{ 
                        fontSize: { xs: '1rem', md: '1.15rem' }, 
                        lineHeight: 1.8, 
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 300
                      }}>
                        {paragraph}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </FadeInSection>
          </Box>
          
          {/* Right Column: Contact */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 4, md: 6 },
            position: { md: 'sticky' },
            top: { md: '120px' }
          }}>
            {!compact && (
              <Box sx={{ 
                bgcolor: 'rgba(20, 20, 35, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                borderRadius: 4,
                p: { xs: 3, sm: 4, md: 5 }
              }}>
                <FadeInSection>
                  <Typography variant="h3" sx={{ 
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                    fontWeight: 'bold'
                  }}>
                    <Box component="span" sx={{ width: 4, height: 28, bgcolor: 'primary.main', borderRadius: 1 }} />
                    Let's Connect
                  </Typography>
                  <ContactSection />
                </FadeInSection>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
