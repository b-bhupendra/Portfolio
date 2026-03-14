import React, { useState, useRef } from 'react';
import { Box, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHolding, setIsHolding] = useState(false);
  const [showBreadcrumb, setShowBreadcrumb] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  if (location.pathname === '/') return null;

  const handlePointerDown = () => {
    setIsHolding(true);
    holdTimer.current = setTimeout(() => {
      setShowBreadcrumb(true);
      setIsHolding(false);
    }, 2000);
  };

  const handlePointerUp = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    if (isHolding && !showBreadcrumb) {
      navigate(-1);
    }
    setIsHolding(false);
  };

  const handlePointerLeave = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    setIsHolding(false);
  };

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 80, md: 32 },
        left: { xs: 16, md: 32 },
        zIndex: 1050,
      }}
      onMouseLeave={() => setShowBreadcrumb(false)}
    >
      <AnimatePresence mode="wait">
        {!showBreadcrumb ? (
          <motion.div
            key="back-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'rgba(20, 20, 35, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(40, 40, 60, 0.9)',
                  transform: 'scale(1.05)'
                },
                userSelect: 'none',
                WebkitUserSelect: 'none'
              }}
            >
              <ArrowBackIcon sx={{ color: 'white', zIndex: 2 }} />
              
              {/* Hold Progress Indicator */}
              <AnimatePresence>
                {isHolding && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 2, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#3B82F6',
                      zIndex: 1
                    }}
                  />
                )}
              </AnimatePresence>
            </Box>
          </motion.div>
        ) : (
          <motion.div
            key="breadcrumbs"
            initial={{ opacity: 0, x: -20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: -20, width: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              height: 48,
              px: 3,
              borderRadius: '24px',
              bgcolor: 'rgba(20, 20, 35, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap'
            }}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                <MuiLink component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </MuiLink>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                  const title = value.charAt(0).toUpperCase() + value.slice(1);

                  return last ? (
                    <Typography color="text.primary" key={to} sx={{ fontWeight: 600 }}>
                      {title}
                    </Typography>
                  ) : (
                    <MuiLink component={Link} to={to} key={to} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                      {title}
                    </MuiLink>
                  );
                })}
              </Breadcrumbs>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
