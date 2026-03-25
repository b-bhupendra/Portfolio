import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { motion } from "motion/react";
import { alpha, useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import { personalInfo } from '../data';

export default function ContactSection() {
  const theme = useTheme();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <Box>
      <Typography variant="body1" sx={{ 
        mb: 3, 
        color: 'text.secondary', 
        fontSize: { xs: '0.95rem', md: '1.05rem' }
      }}>
        I'm always looking to connect with fellow data enthusiasts and professionals. Feel free to reach out!
      </Typography>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Stack spacing={2}>
          <motion.div variants={item}>
            <Button
              href={`mailto:${personalInfo.email}`}
              variant="outlined"
              fullWidth
              sx={{ 
                py: 2, 
                display: 'flex', 
                justifyContent: 'flex-start',
                gap: 2,
                borderColor: 'divider',
                color: 'text.primary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateX(5px)',
                  boxShadow: `0 5px 15px -5px ${alpha(theme.palette.primary.main, 0.3)}`
                }
              }}
            >
              <EmailIcon color="primary" />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" fontWeight="bold">Email</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'none' }}>{personalInfo.email}</Typography>
              </Box>
            </Button>
          </motion.div>
          
          <motion.div variants={item}>
            <Button
              href={personalInfo.linkedin}
              target="_blank"
              variant="outlined"
              fullWidth
              sx={{ 
                py: 2, 
                display: 'flex', 
                justifyContent: 'flex-start',
                gap: 2,
                borderColor: 'divider',
                color: 'text.primary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateX(5px)',
                  boxShadow: `0 5px 15px -5px ${alpha(theme.palette.primary.main, 0.3)}`
                }
              }}
            >
              <LinkedInIcon color="primary" />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" fontWeight="bold">LinkedIn</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'none' }}>Connect with me</Typography>
              </Box>
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Button
              href={`tel:${personalInfo.phone}`}
              variant="outlined"
              fullWidth
              sx={{ 
                py: 2, 
                display: 'flex', 
                justifyContent: 'flex-start',
                gap: 2,
                borderColor: 'divider',
                color: 'text.primary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: 'translateX(5px)',
                  boxShadow: `0 5px 15px -5px ${alpha(theme.palette.primary.main, 0.3)}`
                }
              }}
            >
              <PhoneIcon color="primary" />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" fontWeight="bold">Phone</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'none' }}>{personalInfo.phone}</Typography>
              </Box>
            </Button>
          </motion.div>
        </Stack>
      </motion.div>
    </Box>
  );
}
