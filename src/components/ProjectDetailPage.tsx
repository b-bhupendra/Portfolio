import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Chip, Container } from '@mui/material';
import { motion } from 'motion/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { projects } from '../data';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === projectId) || projects[0];

  return (
    <Box sx={{ 
      height: { xs: 'auto', md: '100vh' },
      minHeight: { xs: '100vh', md: 'auto' }, 
      pt: { xs: 12, md: 0 }, 
      pb: { xs: 8, md: 0 }, 
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      overflowY: { xs: 'hidden', md: 'auto' },
      overflowX: 'hidden',
      '&::-webkit-scrollbar': { display: 'none' },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
    }}>
      
      <Container maxWidth="lg" sx={{ 
        maxHeight: { md: '90vh' }, 
        overflowY: { md: 'auto' }, 
        pr: { md: 2 },
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ 
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: 'auto', display: 'block' }}
                referrerPolicy="no-referrer"
              />
              <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 25, 47, 0.8), transparent)',
                pointerEvents: 'none'
              }} />
            </Box>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, color: 'white' }}>
              {project.title}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {project.tools.map((tool) => (
                <Chip 
                  key={tool} 
                  label={tool} 
                  sx={{ 
                    bgcolor: 'rgba(100, 255, 218, 0.1)', 
                    color: 'primary.main',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                    fontFamily: 'monospace'
                  }} 
                />
              ))}
            </Box>

            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.8, mb: 4 }}>
              {project.description}
            </Typography>

            <Box sx={{ p: 4, borderRadius: '12px', bgcolor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
                Project Overview
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.6 }}>
                This is a placeholder description for the {project.title}. In a real-world scenario, this section would contain detailed information about the project's architecture, challenges faced, and the specific solutions implemented. 
                <br /><br />
                The project focuses on delivering high-performance results using {project.tools.join(', ')}. It demonstrates advanced proficiency in modern web development practices and user-centric design principles.
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
