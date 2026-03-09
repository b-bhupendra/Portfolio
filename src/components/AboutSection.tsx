import React, { useRef } from 'react';
import { Box, Container, Typography, Stack, Paper, Card, CardContent, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from "motion/react";
import MapIcon from '@mui/icons-material/Map';
import CodeIcon from '@mui/icons-material/Code';
import GridBackground from './GridBackground';
import ContactSection from './ContactSection';
import { personalInfo, certifications } from '../data';

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

export default function AboutSection() {
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
    <Box ref={ref} sx={{ py: 12, position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <GridBackground />
      
      {/* Parallax Background Elements */}
      <motion.div style={{ y: y1, opacity, position: 'absolute', top: '10%', right: '5%', zIndex: 0 }}>
        <Box sx={{ width: 300, height: 300, border: '1px solid', borderColor: 'primary.main', opacity: 0.1, borderRadius: '50%' }} />
      </motion.div>
      <motion.div style={{ y: y2, opacity, position: 'absolute', bottom: '10%', left: '5%', zIndex: 0 }}>
        <Box sx={{ width: 200, height: 200, bgcolor: 'primary.main', opacity: 0.05, borderRadius: '50%', filter: 'blur(40px)' }} />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <FadeInSection>
          <Typography variant="h2" sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component="span" sx={{ width: 4, height: 40, bgcolor: 'primary.main' }} />
            ABOUT ME
          </Typography>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={6}>
              <Box sx={{ flex: 2 }}>
                <Stack spacing={3}>
                  {personalInfo.summary.map((paragraph, index) => (
                    <motion.div key={index} variants={item}>
                      <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
                        {paragraph}
                      </Typography>
                    </motion.div>
                  ))}
                </Stack>
                <Box sx={{ mt: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                  <motion.div variants={item}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        bgcolor: 'background.paper', 
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'all 0.3s',
                        '&:hover': { borderColor: 'primary.main' }
                      }}
                    >
                      <MapIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">{personalInfo.location}</Typography>
                    </Paper>
                  </motion.div>
                  <motion.div variants={item}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 3, 
                        bgcolor: 'background.paper', 
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'all 0.3s',
                        '&:hover': { borderColor: 'primary.main' }
                      }}
                    >
                      <CodeIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight="bold">Data Enthusiast</Typography>
                    </Paper>
                  </motion.div>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <motion.div variants={item}>
                  <Card sx={{ height: '100%', bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>CERTIFICATIONS</Typography>
                      <Stack spacing={2}>
                        {certifications.map((cert, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                            <Box sx={{ mt: 1, minWidth: 8, height: 8, bgcolor: 'primary.main' }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{cert}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            </Stack>
          </motion.div>
        </FadeInSection>
        
        {/* Merged Contact Section */}
        <Box sx={{ mt: 12 }}>
          <FadeInSection>
            <Typography variant="h2" sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box component="span" sx={{ width: 4, height: 40, bgcolor: 'primary.main' }} />
              CONTACT
            </Typography>
            <ContactSection />
          </FadeInSection>
        </Box>
      </Container>
    </Box>
  );
}
