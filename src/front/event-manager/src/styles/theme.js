import { createTheme } from '@mui/material/styles';
import { THEME_COLORS } from '../constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: THEME_COLORS.primary,
      light: '#6BB6FF',
      dark: '#1565C0',
    },
    secondary: {
      main: THEME_COLORS.secondary,
      light: '#FF9E6B',
      dark: '#E55722',
    },
    success: {
      main: THEME_COLORS.success,
    },
    warning: {
      main: THEME_COLORS.warning,
    },
    error: {
      main: THEME_COLORS.error,
    },
    background: {
      default: THEME_COLORS.background,
      paper: THEME_COLORS.surface,
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(30, 136, 229, 0.15)',
        },
      },
    },
  },
});
