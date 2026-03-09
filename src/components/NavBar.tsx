import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'motion/react';

export default function NavBar() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [logoState, setLogoState] = useState<'initial' | 'shining' | 'collapsed'>('initial');

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

    return () => {
      clearTimeout(shineTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Experience', href: '/experience' },
    { label: 'About & Contact', href: '/about' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
        BSR.
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button 
              component={Link}
              to={item.href}
              fullWidth 
              sx={{ 
                justifyContent: 'center', 
                color: location.pathname === item.href ? 'primary.main' : 'text.primary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      component="nav" 
      position="fixed" 
      elevation={0}
      sx={{ 
        bgcolor: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Box 
            component={Link} 
            to="/"
            sx={{ 
              position: 'absolute', // Absolute positioning to center the nav items
              left: 0,
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              overflow: 'hidden',
              zIndex: 2
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
              {/* The "B" is always visible */}
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button 
                key={item.label} 
                component={Link}
                to={item.href}
                sx={{ 
                  color: location.pathname === item.href ? 'primary.main' : 'text.secondary', 
                  fontSize: '0.9rem',
                  mx: 1,
                  border: 'none',
                  '&:hover': { color: 'primary.main', backgroundColor: 'transparent', boxShadow: 'none' } 
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 'auto' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, backgroundColor: 'background.default' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
