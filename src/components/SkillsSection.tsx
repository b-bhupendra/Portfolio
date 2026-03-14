import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { skills } from '../data';
import Lottie from 'lottie-react';

export default function SkillsSection() {
  const [lottieData, setLottieData] = useState<any>(null);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch('https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(err => console.error("Failed to load Lottie animation", err));
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      py: { xs: 12, md: 16 },
      px: { xs: 2, sm: 4, md: 8 },
      maxWidth: '1400px',
      margin: '0 auto',
      overflowX: 'hidden'
    }}>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 6, md: 10 }, width: '100%' }}>
        {lottieData && (
          <Box
            component={motion.div}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            sx={{ 
              position: 'absolute', 
              top: { xs: -60, md: -80 }, 
              right: { xs: '10%', md: '20%' }, 
              width: { xs: 120, md: 160 }, 
              height: { xs: 120, md: 160 }, 
              zIndex: -1,
              pointerEvents: 'none'
            }}
          >
            <Lottie 
              lottieRef={lottieRef}
              animationData={lottieData} 
              loop={true} 
              autoplay={true} 
            />
          </Box>
        )}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Typography 
            variant="h3" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold', 
              zIndex: 10,
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em'
            }}
          >
            My Skills
          </Typography>
        </motion.div>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'rgba(255,255,255,0.6)', 
            mt: 2,
            textAlign: 'center',
            maxWidth: '600px'
          }}
        >
          A comprehensive overview of my technical expertise and proficiencies across various domains.
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        },
        gap: { xs: 3, md: 4 },
        width: '100%',
        zIndex: 10
      }}>
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </Box>
    </Box>
  );
}

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ height: '100%' }}
    >
      <Box sx={{
        height: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        bgcolor: 'rgba(20, 20, 35, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: 'rgba(30, 30, 50, 0.8)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            color: 'primary.main', 
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 3,
            bgcolor: 'rgba(70, 147, 255, 0.1)',
            '& > svg': { fontSize: 28 }
          }}>
            {skill.icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', lineHeight: 1.2 }}>
              {skill.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {skill.category}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, ml: 2 }}>
            {skill.proficiency}%
          </Typography>
        </Box>

        <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 3, mb: 3, overflow: 'hidden', position: 'relative' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)', 
              borderRadius: 8,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ 
          color: 'rgba(255,255,255,0.6)', 
          lineHeight: 1.6,
          flexGrow: 1
        }}>
          {skill.description}
        </Typography>
      </Box>
    </motion.div>
  );
};
