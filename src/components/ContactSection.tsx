import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from "motion/react";
import { alpha, useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
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

export default function ContactSection() {
  const theme = useTheme();
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <FadeInSection>
          <Typography variant="h2" sx={{ 
            mb: 3,
            fontSize: { xs: '2rem', md: '3.75rem' }
          }}>LET'S WORK TOGETHER</Typography>
          <Typography variant="h5" sx={{ 
            mb: { xs: 4, md: 8 }, 
            color: 'text.secondary', 
            fontWeight: 400,
            fontSize: { xs: '1.1rem', md: '1.5rem' }
          }}>
            I'm always looking to connect with fellow data enthusiasts and professionals.
          </Typography>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 4 }}>
              <motion.div variants={item}>
                <Box>
                  <Button
                    href={`mailto:${personalInfo.email}`}
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      py: 4, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 2,
                      borderColor: 'divider',
                      color: 'text.primary',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.3)}`
                      }
                    }}
                  >
                    <EmailIcon fontSize="large" color="primary" />
                    <Box>
                      <Typography variant="h6">Email Me</Typography>
                      <Typography variant="caption" color="text.secondary">{personalInfo.email}</Typography>
                    </Box>
                  </Button>
                </Box>
              </motion.div>
              <motion.div variants={item}>
                <Box>
                  <Button
                    href={personalInfo.linkedin}
                    target="_blank"
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      py: 4, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 2,
                      borderColor: 'divider',
                      color: 'text.primary',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.3)}`
                      }
                    }}
                  >
                    <LinkedInIcon fontSize="large" color="primary" />
                    <Box>
                      <Typography variant="h6">LinkedIn</Typography>
                      <Typography variant="caption" color="text.secondary">Connect professionally</Typography>
                    </Box>
                  </Button>
                </Box>
              </motion.div>
              <motion.div variants={item}>
                <Box>
                  <Button
                    href={`tel:${personalInfo.phone}`}
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      py: 4, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: 2,
                      borderColor: 'divider',
                      color: 'text.primary',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.3)}`
                      }
                    }}
                  >
                    <PhoneIcon fontSize="large" color="primary" />
                    <Box>
                      <Typography variant="h6">Call Me</Typography>
                      <Typography variant="caption" color="text.secondary">{personalInfo.phone}</Typography>
                    </Box>
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </motion.div>

          <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 8, md: 12 } }}>
            © {new Date().getFullYear()} Bhupendra Singh Rawat. All rights reserved.
          </Typography>
        </FadeInSection>
      </Container>
    </Box>
  );
}
