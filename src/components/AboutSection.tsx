import React, { useRef } from 'react';
import { Box, Container, Typography, Stack, Paper, Card, CardContent, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import MapIcon from '@mui/icons-material/Map';
import CodeIcon from '@mui/icons-material/Code';
import GridBackground from './GridBackground';
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
    <Box ref={ref} sx={{ py: compact ? 4 : 12, position: 'relative', minHeight: compact ? 'auto' : '100vh', overflow: 'hidden' }}>
      {!compact && <GridBackground />}
      
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

      <Container maxWidth={compact ? false : "lg"} disableGutters={compact} sx={{ position: 'relative', zIndex: 1 }}>
        <FadeInSection>
          <Typography variant="h2" sx={{ 
            mb: { xs: 4, md: 6 }, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            fontSize: { xs: '2rem', md: '3.75rem' }
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
            <Stack spacing={3}>
              {personalInfo.summary.map((paragraph, index) => (
                <motion.div key={index} variants={item}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                    {paragraph}
                  </Typography>
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        </FadeInSection>
        
        {/* Skills Section */}
        <Box sx={{ mt: 8 }}>
          <FadeInSection>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 2, sm: 4 } }}>
                {skills.slice(0, 4).map((skill, index) => (
                  <motion.div key={index} variants={legoDrop}>
                    <Box
                      sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        aspectRatio: '1/1',
                        transition: 'all 0.3s',
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                        '&:hover': { 
                          color: 'primary.main', 
                          transform: 'translateY(-5px)',
                          borderColor: 'primary.main',
                          boxShadow: '0 15px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
                        }
                      }}
                    >
                      <Box sx={{ color: 'inherit', display: 'flex', '& > svg': { fontSize: { xs: 40, sm: 60 }, opacity: 0.8 } }}>
                        {skill.icon}
                      </Box>
                      <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ opacity: 0.9 }}>
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
          <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <FadeInSection>
              <Typography variant="h2" sx={{ 
                mb: { xs: 4, md: 6 }, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                fontSize: { xs: '2rem', md: '3.75rem' }
              }}>
                <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
                CONTACT
              </Typography>
              <ContactSection />
            </FadeInSection>
          </Box>
        )}
      </Container>
    </Box>
  );
}
