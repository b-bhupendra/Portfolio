import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data';
import { ArrowLeft, ArrowRight, Hand } from 'lucide-react';

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <Box sx={{ 
      height: { xs: 'auto', md: '100vh' },
      minHeight: { xs: '100vh', md: 'auto' }, 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      py: { xs: 8, md: 0 },
      bgcolor: 'transparent' // Transparent background to show global background
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          color: 'white', 
          mb: { xs: 4, md: 8 }, 
          fontWeight: 'bold', 
          zIndex: 0, // Lower z-index so cards overlap it
          textAlign: 'center',
          fontSize: { xs: '2rem', md: '3rem' }
        }}
      >
        Projects
      </Typography>
      
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: { xs: 400, sm: 480, md: 520 }, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1000 
      }}>
        <AnimatePresence initial={false}>
          {projects.map((project, index) => {
            // Calculate shortest path offset
            let offset = index - activeIndex;
            const total = projects.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            return (
              <Card 
                key={project.id} 
                project={project} 
                index={index}
                offset={offset}
                total={projects.length}
                onSwipeLeft={handleNext}
                onSwipeRight={handlePrev}
                onClick={() => {
                  if (offset === 0) {
                    navigate(`/projects/${project.id}`);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                isMobile={isMobile}
              />
            );
          })}
        </AnimatePresence>
      </Box>

      <Box sx={{ display: 'flex', gap: { xs: 2, sm: 4 }, mt: { xs: 6, md: 8 }, zIndex: 10, alignItems: 'center', height: 48 }}>
        <IconButton 
          onClick={handlePrev} 
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.1)', 
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            p: { xs: 1.5, sm: 2 }
          }}
        >
          <ArrowLeft size={24} />
        </IconButton>
        
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ duration: 0.5 }}
              style={{ overflow: 'hidden' }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: 'rgba(255,255,255,0.9)', 
                bgcolor: 'rgba(0,0,0,0.4)', 
                px: { xs: 2, sm: 3 }, 
                py: { xs: 1, sm: 1.5 }, 
                borderRadius: 5,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                whiteSpace: 'nowrap'
              }}>
                <Hand size={16} />
                <Typography variant="body2" fontWeight="600" sx={{ letterSpacing: 1, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
                  SWIPE OR CLICK
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        <IconButton 
          onClick={handleNext} 
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.1)', 
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            p: { xs: 1.5, sm: 2 }
          }}
        >
          <ArrowRight size={24} />
        </IconButton>
      </Box>
    </Box>
  );
}

const Card = ({ project, offset, onSwipeLeft, onSwipeRight, onClick, isMobile }: any) => {
  const isFront = offset === 0;
  const isVisible = Math.abs(offset) <= 2; // Show 5 cards total (center, 2 left, 2 right)

  // Hearthstone fan math
  // x offset: space them out horizontally
  const xBase = isMobile ? 110 : 180;
  const x = offset * xBase;
  
  // y offset: push them down to form an arc
  const yBase = isMobile ? 15 : 30;
  const y = Math.abs(offset) * yBase;
  
  // rotation: tilt them outward
  const rotateZ = offset * (isMobile ? 6 : 10);
  
  // scale: make outer cards smaller
  const scale = 1 - Math.abs(offset) * 0.15;
  
  // zIndex: center card is highest
  const zIndex = 50 - Math.abs(offset);
  
  // opacity: fade out cards that are too far
  const opacity = Math.abs(offset) > 2 ? 0 : 1;

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -50) {
      onSwipeLeft();
    } else if (info.offset.x > 50) {
      onSwipeRight();
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: isMobile ? 260 : 340,
        height: isMobile ? 380 : 480,
        zIndex,
        transformOrigin: 'bottom center',
      }}
      initial={false}
      animate={{
        x,
        y,
        rotateZ,
        scale,
        opacity,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        mass: 1
      }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      onClick={onClick}
      whileHover={isFront ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {
        y: y - 5,
        scale: scale * 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={isFront ? { cursor: 'grabbing' } : {}}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: isFront 
          ? '0 10px 30px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.08)' 
          : '0 5px 15px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.05)',
        bgcolor: 'rgba(20, 20, 35, 0.6)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        cursor: isFront ? 'grab' : 'pointer',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(30, 30, 50, 0.8)',
          boxShadow: isFront 
            ? '0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.2)' 
            : '0 10px 20px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
        },
        '&:hover .project-title': {
          color: '#3B82F6',
        },
        '&:hover .project-chip': {
          bgcolor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          color: '#60A5FA',
        }
      }}>
        {/* Dark overlay for non-active cards */}
        {!isFront && (
          <Box sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 5,
            transition: 'background-color 0.3s ease',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' }
          }} />
        )}

        <Box sx={{ height: '45%', width: '100%', overflow: 'hidden', position: 'relative', bgcolor: '#000' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
            draggable={false}
          />
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, left: 0, right: 0, 
            height: '60%', 
            background: 'linear-gradient(to top, rgba(20, 20, 35, 0.95), transparent)' 
          }} />
        </Box>
        <Box sx={{ p: { xs: 2.5, md: 3 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography className="project-title" variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' }, transition: 'all 0.3s ease' }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            mb: 2, 
            flex: 1, 
            display: '-webkit-box', 
            WebkitLineClamp: 3, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            lineHeight: 1.6
          }}>
            {project.description || "An amazing project built with modern technologies."}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.tools.slice(0, 3).map((tool: string, i: number) => (
              <Box key={i} className="project-chip" sx={{ 
                px: 1.5, py: 0.5, 
                borderRadius: 2, 
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}>
                {tool}
              </Box>
            ))}
            {project.tools.length > 3 && (
              <Box sx={{ 
                px: 1.5, py: 0.5, 
                borderRadius: 2, 
                bgcolor: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                +{project.tools.length - 3}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};
