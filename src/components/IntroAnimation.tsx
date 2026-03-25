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
      await new Promise(r => setTimeout(r, 50));
      setStage('drop');

      // 2. Meteor falls (0.4s for a faster, punchier drop)
      await new Promise(r => setTimeout(r, 400));
      setStage('impact');
      
      // 3. Show "Hi" for 0.8s
      await new Promise(r => setTimeout(r, 800));
      
      // 4. Waves/Splash Start
      setStage('ripple');
      onSplashStart(); 

      // 5. Done
      await new Promise(r => setTimeout(r, 1000));
      setStage('done');
      onComplete();
    };
    sequence();
  }, [onComplete, onSplashStart]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'ripple' ? 0 : 1 }}
      transition={{ duration: 1.0, ease: "easeInOut", delay: 0.1 }}
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
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Impact Ripple 1 */}
        {stage === 'impact' && (
          <motion.div
            initial={{ width: 0, height: 0, opacity: 1, borderWidth: '8px' }}
            animate={{ width: '600px', height: '600px', opacity: 0, borderWidth: '1px' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              borderColor: theme.palette.primary.main,
              borderStyle: 'solid',
              boxShadow: `0 0 40px ${theme.palette.primary.main}`,
              zIndex: 3,
            }}
          />
        )}

        {/* Impact Ripple 2 (Delayed) */}
        {stage === 'impact' && (
          <motion.div
            initial={{ width: 0, height: 0, opacity: 1, borderWidth: '4px' }}
            animate={{ width: '400px', height: '400px', opacity: 0, borderWidth: '1px' }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              borderColor: theme.palette.secondary.main,
              borderStyle: 'solid',
              boxShadow: `0 0 20px ${theme.palette.secondary.main}`,
              zIndex: 3,
            }}
          />
        )}

        {/* Reveal Ripple */}
        {stage === 'ripple' && (
          <motion.div
            initial={{ width: '100px', height: '100px', opacity: 1, borderWidth: '4px' }}
            animate={{ width: '250vw', height: '250vw', opacity: 0, borderWidth: '0px' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              borderColor: theme.palette.primary.light,
              borderStyle: 'solid',
              boxShadow: `inset 0 0 50px ${theme.palette.primary.main}, 0 0 50px ${theme.palette.primary.main}`,
              zIndex: 3,
            }}
          />
        )}

        {/* "Hi" Text */}
        <AnimatePresence>
          {(stage === 'impact') && (
              <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                      position: 'absolute',
                      zIndex: 4,
                  }}
              >
                  <Typography variant="h1" sx={{ 
                      fontWeight: 800, 
                      fontSize: { xs: '5rem', md: '7rem' },
                      background: `linear-gradient(135deg, #F8FAFC 0%, ${theme.palette.primary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: `0 10px 30px rgba(59, 130, 246, 0.3)`,
                      letterSpacing: '-0.05em'
                  }}>
                      Hi.
                  </Typography>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Falling Meteor/Line */}
        <AnimatePresence>
          {(stage === 'drop') && (
            <motion.div
              initial={{ y: '-100vh', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, ease: "easeIn" }}
              style={{
                width: '4px',
                height: '150px',
                background: `linear-gradient(to bottom, transparent, ${theme.palette.primary.main}, #ffffff)`,
                borderRadius: '4px',
                boxShadow: `0 0 20px 2px ${theme.palette.primary.main}`,
                zIndex: 5,
                position: 'absolute',
              }}
            />
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};

export default IntroAnimation;
