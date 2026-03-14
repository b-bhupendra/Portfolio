import React, { useState, useEffect } from 'react';
import { Typography, Box, SpeedDial, SpeedDialAction, SpeedDialIcon, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import TimelineIcon from '@mui/icons-material/Timeline';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [logoState, setLogoState] = useState<'initial' | 'shining' | 'collapsed' | 'hidden'>('initial');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Sync with IntroAnimation:
    // Intro starts fading at 3.5s, ends at 5.5s.
    
    // Start shine effect around 4.8s (just before full reveal)
    const shineTimer = setTimeout(() => {
      setLogoState('shining');
    }, 4800);

    // Collapse to "B." after shine completes
    const collapseTimer = setTimeout(() => {
      setLogoState('collapsed');
    }, 5500);

    // Hide completely after collapse
    const hideTimer = setTimeout(() => {
      setLogoState('hidden');
    }, 6500);

    return () => {
      clearTimeout(shineTimer);
      clearTimeout(collapseTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/', icon: <HomeIcon /> },
    { label: 'About', href: '/about', icon: <PersonIcon /> },
    { label: 'Experience', href: '/experience', icon: <TimelineIcon /> },
    { label: 'Projects', href: '/projects', icon: <CodeIcon /> },
    { label: 'Skills', href: '/skills', icon: <BuildIcon /> },
  ];

  const handleNavClick = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          bgcolor: 'rgba(5, 10, 25, 0.2)', // Lighter tint
          backdropFilter: 'blur(4px) brightness(1.5) contrast(1.2)',
          WebkitBackdropFilter: 'blur(4px) brightness(1.5) contrast(1.2)',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: open ? 'auto' : 'none',
          zIndex: 1099,
        }}
        onClick={() => setOpen(false)}
      />
      <Box 
        sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1100, 
          pointerEvents: 'none',
          p: { xs: 2, md: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
      {/* Logo Area */}
      <Box sx={{ position: 'relative', height: 40, pointerEvents: 'auto' }}>
        <AnimatePresence>
          {logoState !== 'hidden' && (
            <Box 
              component={motion.div}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  fontWeight: 700, 
                  color: 'primary.main', 
                  letterSpacing: -1, 
                  fontSize: '1.5rem',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* The "B" is always visible until hidden */}
                <span>B</span>

                {/* The "SR" collapses */}
                <motion.span
                  initial={{ width: 'auto', opacity: 1 }}
                  animate={{ 
                    width: logoState === 'collapsed' ? 0 : 'auto',
                    opacity: logoState === 'collapsed' ? 0 : 1
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ 
                    display: 'inline-block', 
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  SR
                </motion.span>

                {/* The dot */}
                <Box component="span" sx={{ color: 'text.primary' }}>.</Box>

                {/* Shine Effect Overlay */}
                <AnimatePresence>
                  {logoState === 'shining' && (
                    <motion.div
                      initial={{ left: '-100%', opacity: 0 }}
                      animate={{ left: '200%', opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        width: '50%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        transform: 'skewX(-20deg)',
                        zIndex: 10
                      }}
                    />
                  )}
                </AnimatePresence>
              </Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>

      {/* SpeedDial Navigation */}
      <Box sx={{ pointerEvents: 'auto' }}>
        <SpeedDial
          ariaLabel="Navigation Menu"
          icon={<SpeedDialIcon icon={<MenuIcon />} openIcon={<CloseIcon />} />}
          direction={isMobile ? "down" : "left"}
          onClose={(event, reason) => {
            if (reason !== 'mouseLeave') {
              setOpen(false);
            }
          }}
          onOpen={(event, reason) => {
            if (reason === 'toggle') {
              setOpen(true);
            }
          }}
          open={open}
          sx={{
            '& .MuiSpeedDial-fab': {
              bgcolor: 'rgba(5, 5, 5, 0.5)',
              backdropFilter: 'blur(10px)',
              border: open ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
              boxShadow: open ? undefined : 'none',
              color: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.05)',
              }
            },
            '& .MuiSpeedDial-actions': {
              paddingRight: '48px',
            }
          }}
        >
          {navItems.map((item) => (
            <SpeedDialAction
              key={item.label}
              icon={item.icon}
              tooltipTitle={item.label}
              tooltipPlacement="bottom"
              onClick={() => handleNavClick(item.href)}
              FabProps={{
                sx: {
                  bgcolor: 'rgba(5, 5, 5, 0.8)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    transform: 'scale(1.1)',
                  }
                }
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
    </>
  );
}
