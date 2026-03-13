import React, { useState } from 'react';
import { Box, Typography, IconButton, useTheme, alpha } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data';
import { ArrowLeft, ArrowRight, Hand } from 'lucide-react';

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

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
      overflowY: { xs: 'hidden', md: 'auto' },
      overflowX: 'hidden',
      position: 'relative',
      py: { xs: 8, md: 0 },
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          color: 'white', 
          mb: { xs: 4, md: 6 }, 
          fontWeight: 'bold', 
          zIndex: 10,
          textAlign: 'center',
          fontSize: { xs: '2rem', md: '3rem' }
        }}
      >
        Featured Projects
      </Typography>
      
      <Box sx={{ 
        position: 'relative', 
        width: { xs: '80vw', sm: 340, md: 380 }, 
        height: { xs: '60vh', sm: 480, md: 520 }, 
        maxHeight: { xs: 420, sm: 'none' },
        perspective: 1000 
      }}>
        {projects.map((project, index) => {
          const offset = (index - activeIndex + projects.length) % projects.length;
          const isFront = offset === 0;
          
          return (
            <Card 
              key={project.id} 
              project={project} 
              offset={offset}
              isFront={isFront}
              total={projects.length}
              onSwipe={handleNext}
              navigate={navigate}
            />
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 4 }, mt: { xs: 4, md: 8 }, zIndex: 10, alignItems: 'center' }}>
        <IconButton 
          onClick={handlePrev} 
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.1)', 
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            p: { xs: 1, sm: 2 }
          }}
        >
          <ArrowLeft size={24} />
        </IconButton>
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
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Hand size={16} />
          <Typography variant="body2" fontWeight="600" sx={{ letterSpacing: 1, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
            SWIPE OR CLICK
          </Typography>
        </Box>
        <IconButton 
          onClick={handleNext} 
          sx={{ 
            color: 'white', 
            bgcolor: 'rgba(255,255,255,0.1)', 
            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            p: { xs: 1, sm: 2 }
          }}
        >
          <ArrowRight size={24} />
        </IconButton>
      </Box>
    </Box>
  );
}

const Card = ({ project, offset, isFront, total, onSwipe, navigate }: any) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  const handleDragEnd = (e: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe();
    }
  };

  const isVisible = offset < 4;
  const scale = 1 - offset * 0.05;
  const y = offset * 24;
  const opacity = isVisible ? 1 - offset * 0.2 : 0;
  const zIndex = total - offset;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex,
        x,
        rotate,
        transformOrigin: 'bottom center',
      }}
      animate={{
        scale,
        y,
        opacity,
        x: 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      drag={isFront ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={() => {
        if (isFront && Math.abs(x.get()) < 5) {
          navigate(`/projects/${project.id}`);
        }
      }}
      whileHover={isFront ? { y: -8 } : {}}
      whileTap={isFront ? { cursor: 'grabbing' } : {}}
    >
      <Box sx={{
        width: '100%',
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: offset === 0 ? '0 20px 40px rgba(0,0,0,0.6)' : '0 10px 20px rgba(0,0,0,0.3)',
        bgcolor: 'rgba(20, 20, 35, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        flexDirection: 'column',
        cursor: isFront ? 'grab' : 'auto',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}>
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
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
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
              <Box key={i} sx={{ 
                px: 1.5, py: 0.5, 
                borderRadius: 2, 
                bgcolor: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 500,
                border: '1px solid rgba(255,255,255,0.05)'
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
