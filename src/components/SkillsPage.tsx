import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { skills } from '../data';
import GridBackground from './GridBackground';

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<typeof skills[0] | null>(null);

  return (
    <Box sx={{ minHeight: '100vh', pt: 16, pb: 12, position: 'relative', overflow: 'hidden', perspective: '1200px' }}>
      <GridBackground />
      
      <Typography variant="h2" sx={{ 
        position: 'absolute', 
        top: { xs: 80, md: 120 }, 
        left: { xs: '50%', md: 80 }, 
        transform: { xs: 'translateX(-50%)', md: 'none' },
        fontWeight: 700, 
        color: 'white', 
        zIndex: 1,
        fontSize: { xs: '2.5rem', md: '3.75rem' }
      }}>
        Skills
      </Typography>

      {/* Holographic Projection Area (Left Side) */}
      <Box sx={{
        position: 'absolute',
        top: { xs: '25%', md: '40%' },
        left: { xs: '50%', md: 80 },
        transform: { xs: 'translateX(-50%)', md: 'none' },
        width: { xs: '90%', md: '400px' },
        zIndex: 3,
        pointerEvents: 'none',
        textAlign: { xs: 'center', md: 'left' }
      }}>
        <AnimatePresence mode="wait">
          {hoveredSkill ? (
            <motion.div
              key={hoveredSkill.name}
              initial={{ opacity: 0, x: -50, filter: 'blur(20px) hue-rotate(90deg)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px) hue-rotate(0deg)' }}
              exit={{ opacity: 0, x: 50, filter: 'blur(20px) hue-rotate(-90deg)' }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}
            >
              {/* Scanning line effect */}
              <Box sx={{
                position: 'absolute',
                inset: -40,
                background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
                height: '20px',
                animation: 'scanline 2s linear infinite',
                zIndex: 10,
                pointerEvents: 'none',
                '@keyframes scanline': {
                  '0%': { top: '0%' },
                  '100%': { top: '100%' }
                }
              }} />
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 4,
                flexDirection: { xs: 'column', md: 'row' },
                textAlign: { xs: 'center', md: 'left' }
              }}>
                <Box sx={{ 
                  color: '#ffffff', 
                  filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8)) drop-shadow(0 0 40px rgba(255,255,255,0.4))',
                  transform: { xs: 'scale(1.2)', md: 'scale(1.5)' },
                  transformOrigin: { xs: 'center', md: 'left center' }
                }}>
                  {React.cloneElement(hoveredSkill.icon as any, { sx: { fontSize: { xs: 60, md: 80 } } })}
                </Box>
                <Box>
                  <Typography sx={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    fontFamily: 'monospace', 
                    letterSpacing: '0.2em',
                    fontSize: '12px',
                    mb: 1
                  }}>
                    // DECRYPTED_DATA
                  </Typography>
                  <Typography variant="h3" sx={{ 
                    color: '#ffffff', 
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.4)',
                    lineHeight: 1,
                    fontSize: { xs: '1.75rem', md: '3rem' }
                  }}>
                    {hoveredSkill.name}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.4)', 
                fontFamily: 'monospace', 
                letterSpacing: '0.1em',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 8, height: 8, background: 'rgba(255, 255, 255, 0.8)', borderRadius: '50%', display: 'inline-block' }}
                />
                AWAITING_CUBICLE_SELECTION...
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* 3D Isometric Grid Container - Moved to Right Side */}
      <Box sx={{ 
        position: 'absolute', 
        top: { xs: '65%', md: '50%' }, 
        right: { xs: '50%', md: '10%' }, 
        width: { xs: 240, sm: 300, md: 380 },
        transformStyle: 'preserve-3d',
        transform: {
          xs: 'translate(50%, -50%) rotateX(60deg) rotateZ(-45deg) scale(0.8)',
          md: 'translate(0%, -50%) rotateX(60deg) rotateZ(-45deg)'
        },
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: { xs: '12px', md: '20px' },
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        {skills.map((skill, index) => {
          const isHovered = hoveredSkill?.name === skill.name;

          // Calculate assembly animation offsets
          const col = index % 3;
          const row = Math.floor(index / 3);
          const xOffset = (col - 1) * 150;
          const yOffset = (row - 1) * 150;

          return (
            <motion.div
              key={`${skill.name}-${index}`}
              className="skill-block"
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ z: 400, x: xOffset, y: yOffset, opacity: 0, scale: 0.5 }}
              animate={{ z: 0, x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: index * 0.12,
                duration: 1.2,
                type: "spring",
                stiffness: 80,
                damping: 12
              }}
              whileHover={{ 
                z: 30, 
                scale: 1.05,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                zIndex: 1
              }}
            >
              {/* Dynamic Floor Shadow / Energy Pool */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                transform: 'translateZ(-80px)',
                background: 'rgba(255, 255, 255, 0.15)',
                filter: 'blur(15px)',
                borderRadius: '4px',
                transition: 'all 0.3s easeOut',
                '.skill-block:hover &': {
                  transform: 'translateZ(-100px)',
                  filter: 'blur(25px)',
                  background: 'rgba(255, 255, 255, 0.4)',
                }
              }} />

              {/* The "Gem" (Icon) - Placed before the top face so it's physically "inside" the box */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: isHovered 
                  ? 'translateZ(30px) rotateZ(45deg) rotateX(-60deg) scale(1.2)' 
                  : 'translateZ(-10px) rotateZ(45deg) rotateX(-60deg) scale(1)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                pointerEvents: 'none',
                zIndex: 0,
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  color: '#ffffff', 
                  filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,1))' : 'drop-shadow(0 0 10px rgba(255,255,255,0.8))',
                  opacity: isHovered ? 1 : 1,
                  transition: 'all 0.4s ease'
                }}>
                  {React.cloneElement(skill.icon as any, { sx: { fontSize: isHovered ? 42 : 36, transition: 'all 0.4s ease' } })}
                </Box>
              </Box>

              {/* Right Face (Front-Right visually) */}
              <Box sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '80px',
                transformOrigin: 'right',
                transform: 'rotateY(-90deg)',
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.3)', // Glowing edge
                backdropFilter: 'blur(0px)',
                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.02)',
              }} />

              {/* Bottom Face (Front-Left visually) */}
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                transformOrigin: 'bottom',
                transform: 'rotateX(90deg)',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)', // Glowing edge
                backdropFilter: 'blur(0px)',
                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.02)',
              }} />

              {/* Top Face (Translucent Glass Cover) */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(1px)',
                WebkitBackdropFilter: 'blur(1px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                borderRight: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '2px',
                transform: 'translateZ(0)',
                transition: 'all 0.3s easeOut',
                boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.05)',
                zIndex: 1,
                '.skill-block:hover &': {
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  backdropFilter: 'blur(0px)', // Less blur on hover to "reveal" the gem more clearly
                  WebkitBackdropFilter: 'blur(0px)',
                  boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
                  borderRight: '1px solid rgba(255, 255, 255, 0.6)',
                }
              }} />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
