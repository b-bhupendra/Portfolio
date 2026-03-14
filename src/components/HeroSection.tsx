import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { Box, Container, Typography, Stack, Button, IconButton, Avatar, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from "motion/react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from 'react-router-dom';
import { personalInfo, skills } from '../data';
import { useTheme, alpha } from '@mui/material/styles';

const Lottie = lazy(() => import('lottie-react'));

export default function HeroSection() {
  const theme = useTheme();
  const ref = useRef(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [lottieData, setLottieData] = useState<any>(null);
  const [lottieLoading, setLottieLoading] = useState(true);
  const [lottieError, setLottieError] = useState(false);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch('https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json')
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setLottieData(data);
        setLottieLoading(false);
      })
      .catch(err => {
        console.error("Failed to load Lottie animation", err);
        setLottieError(true);
        setLottieLoading(false);
      });
  }, []);

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

  return (
    <Box
      ref={ref}
      sx={{
        height: { xs: 'auto', md: '100vh' },
        minHeight: { xs: '100vh', md: 'auto' },
        position: 'relative',
        overflowY: { xs: 'hidden', md: 'auto' },
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      <Container sx={{ 
        position: 'relative', 
        zIndex: 1, 
        pt: { xs: 12, md: 0 }, 
        pb: { xs: 6, md: 0 }, 
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
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: 40, 
                height: 40, 
                background: 'transparent', 
                transform: 'perspective(100px) rotateX(10deg) rotateY(-10deg)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'perspective(100px) rotateX(0deg) rotateY(0deg)',
                  '& .shard-1': { transform: 'translate(0px, -3px) rotate(-5deg)' },
                  '& .shard-2': { transform: 'translate(-3px, 3px) rotate(-5deg)' },
                  '& .shard-3': { transform: 'translate(3px, 3px) rotate(5deg)' }
                }
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white', overflow: 'visible' }}>
                  <path className="shard-1" d="M12 2 L7 12 H17 Z" style={{ transition: 'all 0.3s ease', transformOrigin: '12px 7px' }} />
                  <path className="shard-2" d="M6 14 L2 22 H12 L11 14 Z" style={{ transition: 'all 0.3s ease', transformOrigin: '7px 18px' }} />
                  <path className="shard-3" d="M18 14 L13 14 L14 22 H22 Z" style={{ transition: 'all 0.3s ease', transformOrigin: '17px 18px' }} />
                </svg>
              </Box>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 1.5, 
                bgcolor: 'rgba(34, 197, 94, 0.1)', 
                border: '1px solid rgba(34, 197, 94, 0.2)', 
                px: 2, 
                py: 0.75, 
                borderRadius: '999px' 
              }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#22C55E' }}>Open to work</Typography>
              </Box>
            </Stack>
          </motion.div>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: { xs: 'center', sm: 'flex-start' }, 
              flex: 1
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Hero Title Block */}
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, display: 'flex', flexDirection: 'column', gap: 1 }}>
                
                {/* Line 1 */}
                <motion.div variants={textVariants}>
                  <Typography variant="h1" sx={{ 
                    fontSize: { xs: 32, sm: 40, md: 56 }, 
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
                          width: { xs: 40, md: 56 }, 
                          height: { xs: 40, md: 56 }, 
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
                    fontSize: { xs: 28, sm: 36, md: 48 }, 
                    fontWeight: 600, 
                    lineHeight: 1.1,
                    color: 'white'
                  }}>
                    <Box component="span" sx={{ color: 'text.secondary' }}>I'm a </Box>
                    <Box component="span" sx={{ color: 'inherit' }}>Full Stack Engineer</Box>
                  </Typography>
                </motion.div>
                
                {/* Line 3 */}
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
                      fontSize: { xs: 28, sm: 36, md: 48 }, 
                      fontWeight: 600, 
                      color: 'primary.main', 
                      lineHeight: 1.1 
                    }}>
                      building scalable APIs.
                    </Typography>
                  </Box>
                </motion.div>
              </Box>

              {/* CTA Section */}
              <motion.div variants={textVariants}>
                <Stack 
                  direction="column" 
                  spacing={4} 
                  alignItems={{ xs: 'center', sm: 'flex-start' }}
                  sx={{ mt: 5 }}
                >
                  <Box sx={{ position: 'relative', width: { xs: '100%', sm: 'auto' }, zIndex: 50 }}>
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
                    >
                      <Button 
                        onClick={() => {
                          setModalOpen(!modalOpen);
                          if (skillsOpen) setSkillsOpen(false);
                        }}
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
                        onClick={() => {
                          setSkillsOpen(!skillsOpen);
                          if (modalOpen) setModalOpen(false);
                        }}
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
                            position: 'relative', 
                            width: '100%', 
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', sm: 'flex-start' },
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
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <IconButton 
                                  href={social.href} 
                                  target={social.href.startsWith('http') ? "_blank" : undefined} 
                                  sx={{ 
                                    width: 64,
                                    height: 64,
                                    color: 'white', 
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.3)',
                                    backdropFilter: 'blur(10px)',
                                    '&:hover': { 
                                      color: 'primary.main', 
                                      borderColor: 'primary.main',
                                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                    '& > svg': { fontSize: 28 }
                                  }}
                                >
                                  {social.icon}
                                </IconButton>
                              </motion.div>
                            ))}
                          </Stack>
                          <Typography sx={{ mt: 1, fontSize: 14, color: 'text.secondary', fontWeight: 500, textAlign: 'center', width: '100%' }}>
                            {personalInfo.email}
                          </Typography>
                        </Box>
                      )}
                    </AnimatePresence>

                    {/* Inline Skills Bubbles */}
                    <AnimatePresence>
                      {skillsOpen && (
                        <Box
                          component={motion.div}
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          sx={{ 
                            position: 'relative', 
                            width: '100%', 
                            mt: 2,
                            display: 'flex',
                            justifyContent: { xs: 'center', sm: 'flex-start' },
                            overflow: 'visible'
                          }}
                        >
                          <Stack direction="row" sx={{ py: 1, flexWrap: 'wrap', gap: 2, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            {skills.slice(0, 4).map((skill, index) => (
                              <Tooltip key={index} title={skill.name} arrow placement="top">
                                <motion.div
                                  whileHover={{ scale: 1.1, y: -5 }}
                                  style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.05)',
                                    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.3)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                  }}
                                >
                                  {/* Water fill effect - Back wave */}
                                  <Box sx={{
                                    position: 'absolute',
                                    top: `${100 - skill.proficiency}%`,
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    bgcolor: 'rgba(59, 130, 246, 0.3)',
                                    borderRadius: '40%',
                                    animation: 'waterSpin 5s linear infinite',
                                    zIndex: 0,
                                    transition: 'top 1s ease-out',
                                    '@keyframes waterSpin': {
                                      '0%': { transform: 'rotate(0deg)' },
                                      '100%': { transform: 'rotate(360deg)' }
                                    }
                                  }} />
                                  {/* Water fill effect - Front wave */}
                                  <Box sx={{
                                    position: 'absolute',
                                    top: `${100 - skill.proficiency + 3}%`,
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    bgcolor: 'rgba(59, 130, 246, 0.5)',
                                    borderRadius: '45%',
                                    animation: 'waterSpin 7s linear infinite',
                                    zIndex: 0,
                                    transition: 'top 1s ease-out'
                                  }} />
                                  <Box sx={{ zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > svg': { fontSize: 28, color: 'white', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' } }}>
                                      {skill.icon}
                                    </Box>
                                  </Box>
                                </motion.div>
                              </Tooltip>
                            ))}
                            {/* >> Button */}
                            <Tooltip title="View All Skills" arrow placement="top">
                              <Box
                                component={motion.div}
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => navigate('/skills')}
                                sx={{
                                  width: 64,
                                  height: 64,
                                  borderRadius: '50%',
                                  background: 'rgba(255,255,255,0.05)',
                                  boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.3)',
                                  backdropFilter: 'blur(10px)',
                                  border: '1px dashed rgba(255,255,255,0.3)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  cursor: 'pointer',
                                  overflow: 'hidden' // Prevents expanding into a square
                                }}
                              >
                                <ArrowForwardIcon sx={{ color: 'white', fontSize: 28 }} />
                              </Box>
                            </Tooltip>
                          </Stack>
                        </Box>
                      )}
                    </AnimatePresence>
                  </Box>

                  <Typography sx={{ 
                    fontSize: 18, 
                    lineHeight: 1.6, 
                    color: 'text.secondary', 
                    maxWidth: 600, 
                    textAlign: { xs: 'center', sm: 'left' },
                    mt: { xs: 4, sm: 5 }
                  }}>
                    Feel free to explore{' '}
                    <motion.span
                      animate={{ 
                        textShadow: [
                          '0 0 2px rgba(139, 92, 246, 1), 0 0 8px rgba(139, 92, 246, 0.8)',
                          '0 0 3px rgba(59, 130, 246, 1), 0 0 12px rgba(59, 130, 246, 0.8)',
                          '0 0 2px rgba(168, 85, 247, 1), 0 0 8px rgba(168, 85, 247, 0.8)',
                          '0 0 2px rgba(139, 92, 246, 1), 0 0 8px rgba(139, 92, 246, 0.8)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{ 
                        display: 'inline-block', 
                        margin: '0 4px',
                      }}
                    >
                      <Typography 
                        component={Link} 
                        to="/projects" 
                        sx={{ 
                          color: 'white', 
                          textDecoration: 'none', 
                          fontWeight: 700,
                          display: 'inline-block',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            color: '#E0E7FF',
                          }
                        }}
                      >
                        my portfolio
                      </Typography>
                    </motion.span>
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

            {/* Lottie Animation */}
            <Box 
              onClick={() => navigate('/projects')}
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                width: { md: 350, lg: 450 },
                height: { md: 350, lg: 450 },
                justifyContent: 'center',
                alignItems: 'center',
                ml: { md: 4 },
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
              onMouseEnter={() => lottieRef.current?.setSpeed(1.5)}
              onMouseLeave={() => lottieRef.current?.setSpeed(0.5)}
            >
              {lottieLoading && (
                <Box sx={{ 
                  width: 60, height: 60, 
                  borderRadius: '50%', 
                  border: '3px solid rgba(255,255,255,0.1)', 
                  borderTopColor: 'primary.main', 
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }} />
              )}
              {lottieError && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                  Animation unavailable
                </Typography>
              )}
              {!lottieLoading && !lottieError && lottieData && (
                <Suspense fallback={
                  <Box sx={{ 
                    width: 60, height: 60, 
                    borderRadius: '50%', 
                    border: '3px solid rgba(255,255,255,0.1)', 
                    borderTopColor: 'primary.main', 
                    animation: 'spin 1s linear infinite'
                  }} />
                }>
                  <Lottie 
                    lottieRef={lottieRef}
                    animationData={lottieData} 
                    loop={true} 
                    autoplay={true} 
                    onDOMLoaded={() => {
                      if (lottieRef.current) {
                        lottieRef.current.setSpeed(0.5);
                      }
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Suspense>
              )}
            </Box>
          </Box>

        </motion.div>
      </Container>
    </Box>
  );
}
