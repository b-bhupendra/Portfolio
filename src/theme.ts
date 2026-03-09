import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4169e1', // Royal Blue
      light: '#7b94f5',
      dark: '#0041af',
    },
    secondary: {
      main: '#ffd700', // Gold accent for Royal theme
    },
    background: {
      default: '#050a19', // Very dark royal blue
      paper: '#0a1428',   // Slightly lighter
    },
    text: {
      primary: '#f0f4ff', // Cool white
      secondary: '#a0b0d0', // Blue-grey
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#e6f1ff', // Brightest white
    },
    h2: {
      fontWeight: 600,
      color: '#e6f1ff',
    },
    h3: {
      fontWeight: 500,
      color: '#ccd6f6',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        outlined: {
            borderColor: '#4169e1',
            color: '#4169e1',
            '&:hover': {
                backgroundColor: 'rgba(65, 105, 225, 0.1)',
                borderColor: '#4169e1',
            }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#112240',
          backgroundImage: 'none',
          boxShadow: '0 10px 30px -15px rgba(2, 12, 27, 0.7)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 25, 47, 0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
          backgroundImage: 'none',
          boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
        },
      },
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: '#112240',
                color: '#ccd6f6',
            }
        }
    }
  },
});
