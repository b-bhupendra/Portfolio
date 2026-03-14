import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'motion/react';
import { skills } from '../data';
import Lottie from 'lottie-react';

export default function SkillsPage() {
  const [lottieData, setLottieData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    // Fetch a developer/skills related Lottie animation
    fetch('https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  return (
    <Box sx={{ 
      height: { xs: 'auto', md: '100vh' }, 
      display: 'flex',
      alignItems: 'center',
      pt: { xs: 12, md: 0 }, 
      pb: { xs: 12, md: 0 }, 
      position: 'relative', 
      overflowY: { xs: 'hidden', md: 'auto' },
      overflowX: 'hidden',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 4, md: 6 }, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, position: 'relative' }}>
          
          {/* Lottie Animation in Header */}
          {lottieData && (
            <Box sx={{ 
              position: 'absolute', 
              top: { xs: -60, md: -100 }, 
              right: { xs: -20, md: '15%' }, 
              width: { xs: 120, md: 200 }, 
              height: { xs: 120, md: 200 }, 
              opacity: 0.6, 
              zIndex: -1,
              pointerEvents: 'none'
            }}>
              <Lottie 
                lottieRef={lottieRef}
                animationData={lottieData} 
                loop={true} 
                autoplay={true} 
              />
            </Box>
          )}

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          >
            <Typography variant="h2" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              fontSize: { xs: '2rem', md: '3.75rem' },
              fontWeight: 'bold',
              color: 'white'
            }}>
              <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
              SKILLS
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography sx={{ color: 'text.secondary', mt: 2, fontSize: '1.1rem', textAlign: 'center', maxWidth: 600 }}>
              A comprehensive overview of my technical expertise and tools I use to build scalable applications.
            </Typography>
          </motion.div>
        </Box>

        {/* Grid */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          px: 1,
          pb: 2,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}>
          <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
            {skills.map((skill, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    y: [0, -12, 0] // Continuous floating effect
                  }}
                  transition={{ 
                    opacity: { duration: 0.4, delay: index * 0.08 },
                    scale: { type: "spring", bounce: 0.6, duration: 0.8, delay: index * 0.08 },
                    rotate: { type: "spring", bounce: 0.5, duration: 0.8, delay: index * 0.08 },
                    y: { 
                      duration: 3 + (index % 3), // Randomize float duration slightly
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "easeInOut",
                      delay: index * 0.08 + 0.8 // Start floating after entrance
                    }
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 5, 
                    transition: { type: "spring", bounce: 0.6, duration: 0.4 } 
                  }}
                  style={{ height: '100%' }}
                >
                  <Box sx={{
                    p: { xs: 2, md: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    aspectRatio: '1/1',
                    '&:hover': {
                      bgcolor: 'rgba(59, 130, 246, 0.05)',
                      borderColor: 'primary.main',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                      '& .skill-icon': {
                        color: 'primary.main',
                        transform: 'scale(1.2) translateY(-5px)'
                      },
                      '& .skill-name': {
                        color: 'white'
                      }
                    }
                  }}>
                    <Box className="skill-icon" sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      display: 'flex',
                      '& > svg': { fontSize: { xs: 40, md: 48 } }
                    }}>
                      {skill.icon}
                    </Box>
                    
                    <Typography className="skill-name" sx={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontWeight: 'bold',
                      fontSize: { xs: '0.9rem', md: '1.1rem' },
                      textAlign: 'center',
                      transition: 'all 0.3s'
                    }}>
                      {skill.name}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
