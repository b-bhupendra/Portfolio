import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Soft Blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#10B981', // Emerald Green
    },
    background: {
      default: '#0B0F19', // Deep Midnight Slate
      paper: '#111827',   // Dark Slate (Elevated)
    },
    text: {
      primary: '#F8FAFC', // Off-white for less eye strain
      secondary: '#94A3B8', // Muted slate gray
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 700,
      color: '#F8FAFC',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 600,
      color: '#F8FAFC',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 600,
      color: '#E2E8F0',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Space Grotesk", "Inter", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      textTransform: 'none',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 600,
        },
        outlined: {
            borderColor: '#3B82F6',
            color: '#3B82F6',
            '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderColor: '#3B82F6',
            }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111827',
          backgroundImage: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(11, 15, 25, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: '#111827',
                color: '#F8FAFC',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            }
        }
    }
  },
});
