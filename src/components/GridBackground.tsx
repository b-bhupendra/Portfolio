import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'motion/react';

export default function GridBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.05, // Even more transparent
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(to right, #4169e1 1px, transparent 1px),
            linear-gradient(to bottom, #4169e1 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </Box>
  );
}
