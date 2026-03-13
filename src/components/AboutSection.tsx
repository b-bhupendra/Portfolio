import React, { useRef } from 'react';
import { Box, Container, Typography, Stack, Paper, Card, CardContent, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import MapIcon from '@mui/icons-material/Map';
import CodeIcon from '@mui/icons-material/Code';
import ContactSection from './ContactSection';
import { personalInfo, certifications, skills } from '../data';

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

  const legoDrop = {
    hidden: { opacity: 0, y: -150, scale: 0.8 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        bounce: 0.5, 
        duration: 1,
      } 
    }
  };

  return (
    <Box ref={ref} id="about" sx={{ 
      height: compact ? 'auto' : '100vh', 
      display: 'flex',
      alignItems: 'center',
      position: 'relative', 
      overflowY: { xs: 'hidden', md: 'auto' },
      overflowX: 'hidden',
      bgcolor: 'transparent',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      
      {/* Parallax Background Elements */}
      {!compact && (
        <>
          <motion.div style={{ y: y1, opacity, position: 'absolute', top: '10%', right: '5%', zIndex: 0 }}>
            <Box sx={{ width: 300, height: 300, border: '1px solid', borderColor: 'primary.main', opacity: 0.1, borderRadius: '50%' }} />
          </motion.div>
          <motion.div style={{ y: y2, opacity, position: 'absolute', bottom: '10%', left: '5%', zIndex: 0 }}>
            <Box sx={{ width: 200, height: 200, bgcolor: 'primary.main', opacity: 0.05, borderRadius: '50%', filter: 'blur(40px)' }} />
          </motion.div>
        </>
      )}

      <Container maxWidth={compact ? false : "lg"} disableGutters={compact} sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 0 }, height: '100%' }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: { xs: 4, md: 8 },
          alignItems: 'center',
          height: '100%'
        }}>
          {/* Left Column: About Text */}
          <Box sx={{ 
            maxHeight: { md: '80vh' }, 
            overflowY: { md: 'auto' }, 
            pr: { md: 2 },
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            <FadeInSection>
              <Typography variant="h2" sx={{ 
                mb: { xs: 3, md: 4 }, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}>
                <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
                ABOUT ME
              </Typography>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <Stack spacing={2}>
                  {personalInfo.summary.map((paragraph, index) => (
                    <motion.div key={index} variants={item}>
                      <Typography variant="body1" sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.7, color: 'text.secondary' }}>
                        {paragraph}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </FadeInSection>
          </Box>
          
          {/* Right Column: Skills & Contact */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 4, md: 6 },
            maxHeight: { md: '80vh' }, 
            overflowY: { md: 'auto' }, 
            pr: { md: 2 },
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            {/* Skills Section */}
            <Box>
              <FadeInSection>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                    {skills.slice(0, 4).map((skill, index) => (
                      <motion.div key={index} variants={legoDrop}>
                        <Box
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            aspectRatio: '16/9',
                            transition: 'all 0.3s',
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                            '&:hover': { 
                              color: 'primary.main', 
                              transform: 'translateY(-5px)',
                              borderColor: 'primary.main',
                              boxShadow: '0 15px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
                            }
                          }}
                        >
                          <Box sx={{ color: 'inherit', display: 'flex', '& > svg': { fontSize: 32, opacity: 0.8 } }}>
                            {skill.icon}
                          </Box>
                          <Typography variant="subtitle2" fontWeight="bold" textAlign="center" sx={{ opacity: 0.9 }}>
                            {skill.name}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>
              </FadeInSection>
            </Box>

            {/* Merged Contact Section */}
            {!compact && (
              <Box>
                <FadeInSection>
                  <Typography variant="h3" sx={{ 
                    mb: 3, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}>
                    <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'primary.main' }} />
                    CONTACT
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
