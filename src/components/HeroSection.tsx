import React, { useRef, useState } from 'react';
import { Box, Container, Typography, Stack, Button, IconButton, Modal, Backdrop, Fade, Avatar } from '@mui/material';
import { motion, AnimatePresence } from "motion/react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import GridBackground from './GridBackground';
import { personalInfo, skills } from '../data';
import { useTheme, alpha } from '@mui/material/styles';

export default function HeroSection() {
  const theme = useTheme();
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const legoDrop = {
    hidden: { opacity: 0, y: -50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        bounce: 0.4, 
        duration: 0.8,
      } 
    }
  };

  const skillsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.8 // Start after hero animation
      }
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <GridBackground />
      
      <Container sx={{ 
        position: 'relative', 
        zIndex: 1, 
        pt: { xs: 12, md: 10 }, 
        pb: { xs: 6, md: 8 }, 
        px: { xs: 2, md: 4 }, 
        maxWidth: '1100px !important' 
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {/* Header Row */}
          <motion.div variants={textVariants}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: { xs: 4, md: 6 }, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}>
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
              <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'text.secondary' }}>
                {personalInfo.email}
              </Typography>
            </Stack>
          </motion.div>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: { xs: 'center', sm: 'flex-start' }, 
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Hero Title Block */}
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, display: 'flex', flexDirection: 'column', gap: 1 }}>
                
                {/* Line 1 */}
                <motion.div variants={textVariants}>
                  <Typography variant="h1" sx={{ 
                    fontSize: { xs: 36, sm: 48, md: 64 }, 
                    fontWeight: 700, 
                    lineHeight: 1.1, 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: { xs: 'center', sm: 'flex-start' }, 
                    flexWrap: 'wrap', 
                    gap: { xs: 1, sm: 2 } 
                  }}>
                    Hi, I'm 
                    <motion.div variants={avatarVariants}>
                      <Avatar 
                        src="https://picsum.photos/seed/bhupendra/200/200" 
                        sx={{ 
                          width: { xs: 48, md: 64 }, 
                          height: { xs: 48, md: 64 }, 
                          border: '2px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }} 
                      />
                    </motion.div>
                    <Box component="span" sx={{ 
                      display: 'inline-flex', 
                      alignItems: 'center',
                      position: 'relative',
                      color: 'primary.main',
                      textShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}>
                      {"Bhupendra!".split('').map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 1.2 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.2, 
                            delay: 1.2 + index * 0.08,
                            ease: "easeOut"
                          }}
                          style={{ display: 'inline-block' }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ 
                          duration: 0.8, 
                          repeat: Infinity, 
                          ease: "linear",
                          delay: 1.2
                        }}
                        style={{ 
                          display: 'inline-block', 
                          width: '3px', 
                          height: '1em', 
                          backgroundColor: theme.palette.primary.main,
                          marginLeft: '4px',
                          boxShadow: `0 0 10px ${theme.palette.primary.main}`
                        }}
                      />
                    </Box>
                  </Typography>
                </motion.div>
                
                {/* Line 2 */}
                <motion.div variants={textVariants}>
                  <Typography variant="h2" sx={{ 
                    fontSize: { xs: 32, sm: 40, md: 56 }, 
                    fontWeight: 600, 
                    lineHeight: 1.1 
                  }}>
                    <Box component="span" sx={{ color: 'text.secondary' }}>I'm a </Box>
                    <Box component="span" sx={{ color: 'white' }}>Full Stack Engineer</Box>
                  </Typography>
                </motion.div>
                
                {/* Line 3 & Badge */}
                <motion.div variants={textVariants}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: { xs: 'center', sm: 'flex-start' }, 
                    flexWrap: 'wrap', 
                    gap: { xs: 2, sm: 3 }, 
                    mt: 1 
                  }}>
                    <Typography variant="h2" sx={{ 
                      fontSize: { xs: 36, sm: 48, md: 64 }, 
                      fontWeight: 700, 
                      color: 'primary.main', 
                      lineHeight: 1.1 
                    }}>
                      building scalable APIs.
                    </Typography>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: 1.5, 
                      bgcolor: '#1E1E1E', 
                      border: '1px solid #2A2A2A', 
                      px: 2, 
                      py: 1, 
                      borderRadius: '999px' 
                    }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#22C55E' }} />
                      <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'text.secondary' }}>Open to work</Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Box>

              {/* CTA Section */}
              <motion.div variants={textVariants}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3.5} 
                  alignItems={{ xs: 'center', sm: 'flex-start' }}
                  sx={{ mt: 5 }}
                >
                  <Box sx={{ position: 'relative', width: { xs: '100%', sm: 'auto' } }}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
                    >
                      <Button 
                        onClick={() => setModalOpen(!modalOpen)}
                        variant="contained"
                        sx={{ 
                          bgcolor: 'white', 
                          color: 'black', 
                          px: 3.5, 
                          py: 1.5, 
                          borderRadius: '999px', 
                          fontWeight: 600, 
                          fontSize: 16,
                          textTransform: 'none',
                          boxShadow: '0 4px 14px 0 rgba(255, 255, 255, 0.1)',
                          '&:hover': { 
                            bgcolor: '#EAEAEA',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(255, 255, 255, 0.15)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Contact Me
                      </Button>
                      <Button 
                        component={Link}
                        to="/skills"
                        variant="outlined"
                        sx={{ 
                          color: 'white', 
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          px: 3.5, 
                          py: 1.5, 
                          borderRadius: '999px', 
                          fontWeight: 600, 
                          fontSize: 16,
                          textTransform: 'none',
                          '&:hover': { 
                            borderColor: 'white',
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Skills
                      </Button>
                    </Stack>

                    {/* Inline Contact Options */}
                    <AnimatePresence>
                      {modalOpen && (
                        <Box
                          component={motion.div}
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          sx={{ 
                            position: { xs: 'relative', sm: 'absolute' }, 
                            top: { sm: '100%' }, 
                            left: { xs: 0, sm: 0 }, 
                            width: { xs: '100%', sm: 'max-content' }, 
                            mt: { xs: 2, sm: 2 },
                            zIndex: 10,
                            display: 'flex',
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            overflow: 'hidden'
                          }}
                        >
                          <Stack direction="row" spacing={2} sx={{ py: 1 }}>
                            {[
                              { href: personalInfo.linkedin, icon: <LinkedInIcon /> },
                              { href: `mailto:${personalInfo.email}`, icon: <EmailIcon /> },
                              { href: personalInfo.github, icon: <GitHubIcon /> }
                            ].map((social, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <IconButton 
                                  href={social.href} 
                                  target={social.href.startsWith('http') ? "_blank" : undefined} 
                                  sx={{ 
                                    color: 'white', 
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    p: { xs: 1.5, sm: 2 },
                                    '&:hover': { 
                                      color: 'primary.main', 
                                      borderColor: 'primary.main',
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    } 
                                  }}
                                >
                                  {social.icon}
                                </IconButton>
                              </motion.div>
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </AnimatePresence>
                  </Box>

                  <Typography sx={{ 
                    fontSize: 18, 
                    lineHeight: 1.6, 
                    color: 'text.secondary', 
                    maxWidth: 500, 
                    textAlign: { xs: 'center', sm: 'left' },
                    transition: 'margin-top 0.3s ease'
                  }}>
                    Feel free to explore{' '}
                    <Typography 
                      component={Link} 
                      to="/projects" 
                      sx={{ 
                        color: 'primary.main', 
                        textDecoration: 'none', 
                        fontWeight: 600,
                        display: 'inline-block',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      my portfolio
                    </Typography>
                    {' '}and reach out — I'd love to connect!
                    <Typography 
                      component={Link} 
                      to="/about" 
                      sx={{ 
                        color: 'primary.main', 
                        textDecoration: 'none', 
                        fontWeight: 600,
                        ml: 1,
                        display: 'inline-block',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Know more
                    </Typography>
                  </Typography>
                </Stack>
              </motion.div>
            </Box>

          </Box>

        </motion.div>
      </Container>
    </Box>
  );
}
