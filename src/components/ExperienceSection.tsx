import React, { useRef } from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import { alpha, useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { experience, education } from '../data';

function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceSection() {
  const theme = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <Box ref={ref} sx={{ 
      pt: { xs: 12, md: 16 }, 
      pb: { xs: 12, md: 4 }, 
      position: 'relative', 
      height: { xs: 'auto', md: '100vh' }, 
      minHeight: { xs: '100vh', md: 'auto' },
      overflowY: { xs: 'hidden', md: 'auto' },
      overflowX: 'hidden',
      display: 'flex',
      alignItems: 'center',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      
      {/* Parallax Background Elements */}
      <motion.div style={{ y: y1, opacity, position: 'absolute', top: '15%', right: '10%', zIndex: 0 }}>
        <Box sx={{ width: 150, height: 150, border: '4px solid', borderColor: alpha(theme.palette.primary.main, 0.05), transform: 'rotate(45deg)' }} />
      </motion.div>
      <motion.div style={{ y: y2, opacity, position: 'absolute', bottom: '20%', left: '5%', zIndex: 0 }}>
        <Box sx={{ width: 100, height: 100, bgcolor: 'primary.main', opacity: 0.05 }} />
      </motion.div>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        <FadeInSection>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: { xs: 8, md: 6 },
            height: '100%'
          }}>
            
            {/* Experience Column */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h2" sx={{ 
                mb: { xs: 4, md: 6 }, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}>
                <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
                EXPERIENCE
              </Typography>
              
              <Box sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                pr: 2,
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Stack spacing={4}>
                    {experience.map((job, index) => (
                      <motion.div key={index} variants={item}>
                        <Box sx={{ position: 'relative' }}>
                          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: { xs: 1, lg: 4 } }}>
                            <Box sx={{ width: { xs: '100%', lg: '25%' }, textAlign: { lg: 'right' } }}>
                              <Typography variant="subtitle1" color="primary" fontWeight="bold">{job.period}</Typography>
                              <Typography variant="body2" color="text.secondary">{job.duration}</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Box 
                                sx={{ 
                                  pl: { lg: 4 }, 
                                  borderLeft: { lg: `1px solid ${alpha(theme.palette.primary.main, 0.3)}` },
                                  position: 'relative'
                                }}
                              >
                                <Box 
                                  sx={{ 
                                    position: 'absolute', 
                                    left: -5, 
                                    top: 6, 
                                    width: 9, 
                                    height: 9, 
                                    bgcolor: 'primary.main',
                                    display: { xs: 'none', lg: 'block' }
                                  }} 
                                />
                                <Typography variant="h5" sx={{ 
                                  mb: 0.5, 
                                  fontWeight: 700,
                                }}>{job.role}</Typography>
                                <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.secondary' }}>{job.company}</Typography>
                                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <MapIcon fontSize="small" /> {job.location}
                                </Typography>
                                
                                <Stack spacing={1}>
                                  {job.achievements.map((achievement, i) => (
                                    <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                                      <ChevronRightIcon color="primary" sx={{ mt: 0.2, flexShrink: 0, fontSize: '1.2rem' }} />
                                      <Typography variant="body2" color="text.secondary">{achievement}</Typography>
                                    </Box>
                                  ))}
                                </Stack>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                </motion.div>
              </Box>
            </Box>

            {/* Education Column */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h2" sx={{ 
                mb: { xs: 4, md: 6 }, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                fontSize: { xs: '2rem', md: '3rem' }
              }}>
                <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
                EDUCATION
              </Typography>
              
              <Box sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                pr: 2,
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
              }}>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Stack spacing={3}>
                    {education.map((edu, index) => (
                      <motion.div key={index} variants={item}>
                        <Card sx={{ bgcolor: 'background.paper', p: 2, border: '1px solid', borderColor: 'divider' }}>
                          <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, p: '16px !important' }}>
                            <Box>
                              <Typography variant="h6" fontWeight="bold">{edu.institution}</Typography>
                              <Typography variant="body2" color="text.secondary">{edu.degree}</Typography>
                            </Box>
                            <Chip label={edu.period} variant="outlined" color="primary" size="small" sx={{ alignSelf: { xs: 'start', sm: 'center' } }} />
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Stack>
                </motion.div>
              </Box>
            </Box>

          </Box>
        </FadeInSection>
      </Container>
    </Box>
  );
}
