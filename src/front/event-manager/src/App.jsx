import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import CreateEventPage from './pages/CreateEventPage';
import './styles/global.css';

// Tema customizado do Material-UI inspirado no Symplá
const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88E5', // Azul principal similar ao Symplá
      light: '#6BB6FF',
      dark: '#1565C0',
    },
    secondary: {
      main: '#FF6B35', // Laranja para contrastes
      light: '#FF9E6B',
      dark: '#E55722',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
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
    borderRadius: 12,
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/create" element={<CreateEventPage />} 
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
