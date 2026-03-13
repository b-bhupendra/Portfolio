import React, { useRef } from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import { alpha, useTheme } from '@mui/material/styles';
import MapIcon from '@mui/icons-material/Map';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GridBackground from './GridBackground';
import { experience, education } from '../data';

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
    show: { opacity: 1, x: 0 }
  };

  return (
    <Box ref={ref} sx={{ py: 12, position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <GridBackground />
      
      {/* Parallax Background Elements */}
      <motion.div style={{ y: y1, opacity, position: 'absolute', top: '15%', right: '10%', zIndex: 0 }}>
        <Box sx={{ width: 150, height: 150, border: '4px solid', borderColor: alpha(theme.palette.primary.main, 0.05), transform: 'rotate(45deg)' }} />
      </motion.div>
      <motion.div style={{ y: y2, opacity, position: 'absolute', bottom: '20%', left: '5%', zIndex: 0 }}>
        <Box sx={{ width: 100, height: 100, bgcolor: 'primary.main', opacity: 0.05 }} />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <FadeInSection>
          <Typography variant="h2" sx={{ 
            mb: { xs: 4, md: 8 }, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            fontSize: { xs: '2rem', md: '3.75rem' }
          }}>
            <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
            EXPERIENCE
          </Typography>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Stack spacing={6}>
              {experience.map((job, index) => (
                <motion.div key={index} variants={item}>
                  <Box sx={{ position: 'relative' }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                      <Box sx={{ width: { xs: '100%', md: '25%' }, textAlign: { md: 'right' } }}>
                        <Typography variant="h6" color="primary" fontWeight="bold">{job.period}</Typography>
                        <Typography variant="body2" color="text.secondary">{job.duration}</Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box 
                          sx={{ 
                            pl: { md: 4 }, 
                            borderLeft: { md: `1px solid ${alpha(theme.palette.primary.main, 0.3)}` },
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
                              display: { xs: 'none', md: 'block' }
                            }} 
                          />
                          <Typography variant="h4" sx={{ 
                            mb: 1, 
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', md: '2.125rem' }
                          }}>{job.role}</Typography>
                          <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>{job.company}</Typography>
                          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MapIcon fontSize="small" /> {job.location}
                          </Typography>
                          
                          <Stack spacing={2}>
                            {job.achievements.map((achievement, i) => (
                              <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                                <ChevronRightIcon color="primary" sx={{ mt: 0.5, flexShrink: 0 }} />
                                <Typography variant="body1" color="text.secondary">{achievement}</Typography>
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

          <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <Typography variant="h2" sx={{ 
              mb: { xs: 4, md: 6 }, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              fontSize: { xs: '2rem', md: '3.75rem' }
            }}>
              <Box component="span" sx={{ width: 4, height: { xs: 30, md: 40 }, bgcolor: 'primary.main' }} />
              EDUCATION
            </Typography>
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
                      <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, gap: 2 }}>
                        <Box>
                          <Typography variant="h5" fontWeight="bold">{edu.institution}</Typography>
                          <Typography variant="body1" color="text.secondary">{edu.degree}</Typography>
                        </Box>
                        <Chip label={edu.period} variant="outlined" color="primary" sx={{ alignSelf: { xs: 'start', md: 'center' } }} />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Box>
        </FadeInSection>
      </Container>
    </Box>
  );
}
