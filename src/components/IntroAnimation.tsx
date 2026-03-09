import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@mui/material/styles';

interface IntroAnimationProps {
  onComplete: () => void;
  onSplashStart: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, onSplashStart }) => {
  const [stage, setStage] = useState<'init' | 'drop' | 'impact' | 'ripple' | 'done'>('init');
  const theme = useTheme();

  useEffect(() => {
    const sequence = async () => {
      // 1. Init
      await new Promise(r => setTimeout(r, 100));
      setStage('drop');

      // 2. Drop falls (1.5s)
      await new Promise(r => setTimeout(r, 1500));
      setStage('impact');
      
      // 3. Show "Hi" for 1s
      await new Promise(r => setTimeout(r, 1000));
      
      // 4. Waves/Splash Start
      setStage('ripple');
      onSplashStart(); 

      // 5. Done
      await new Promise(r => setTimeout(r, 2000));
      setStage('done');
      onComplete();
    };
    sequence();
  }, [onComplete, onSplashStart]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'ripple' ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: stage === 'ripple' ? 'none' : 'auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.default,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Impact Ripple (Small) */}
        {stage === 'impact' && (
          <motion.div
            initial={{ width: 0, height: 0, opacity: 1, borderWidth: '10px' }}
            animate={{ width: '300px', height: '300px', opacity: 0, borderWidth: '1px' }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderStyle: 'solid',
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.3)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 3,
            }}
          />
        )}

        {/* Reveal Ripple (Single, thin) */}
        {stage === 'ripple' && (
          <motion.div
            initial={{ width: '100px', height: '100px', opacity: 1, borderWidth: '4px' }}
            animate={{ width: '250vw', height: '250vw', opacity: 0, borderWidth: '0px' }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              borderStyle: 'solid',
              boxShadow: 'inset 0 0 10px rgba(255,255,255,0.1), 0 0 10px rgba(255,255,255,0.1)',
              backdropFilter: 'blur(2px) brightness(1.1)',
              WebkitBackdropFilter: 'blur(2px) brightness(1.1)',
              zIndex: 3,
            }}
          />
        )}

        {/* "Hi" Text */}
        <AnimatePresence>
          {(stage === 'impact') && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                  transition={{ duration: 0.5 }}
                  style={{
                      position: 'absolute',
                      zIndex: 4,
                      color: theme.palette.text.primary,
                      textShadow: '0 0 20px rgba(65, 105, 225, 0.5)', // Glow
                  }}
              >
                  <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '5rem' }}>
                      Hi.
                  </Typography>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Transparent Water Drop */}
        <AnimatePresence>
          {(stage === 'drop') && (
            <motion.div
              initial={{ y: -600, scale: 0, opacity: 0, rotate: 45 }}
              animate={{ y: 0, scale: 1, opacity: 1, rotate: 45 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeIn" }}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '0% 50% 50% 50%', 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                boxShadow: `
                    inset 2px 2px 5px rgba(255,255,255,0.4), 
                    inset -2px -2px 5px rgba(0,0,0,0.2),
                    0 5px 10px rgba(0,0,0,0.2)
                `,
                border: '1px solid rgba(255,255,255,0.2)',
                zIndex: 5,
                position: 'relative',
              }}
            />
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default IntroAnimation;
