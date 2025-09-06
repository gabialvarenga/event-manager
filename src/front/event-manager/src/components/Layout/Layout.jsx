import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  Calendar,
  Home,
  Plus,
  List as ListIcon
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/events', icon: ListIcon, label: 'Meus eventos' },
    { path: '/create', icon: Plus, label: 'Criar evento' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: '#1E88E5',
          boxShadow: '0 2px 8px rgba(30, 136, 229, 0.15)',
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          px: { xs: 2, md: 3 },
          py: 1
        }}>
          {/* Logo e Título */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <Calendar size={28} color="white" />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              Event Manager
            </Typography>
          </Box>

          {/* Navigation Desktop */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 1,
            alignItems: 'center' 
          }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                startIcon={<item.icon size={18} />}
                sx={{
                  color: 'white',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  fontWeight: 500,
                  textTransform: 'none',
                  background: isActivePath(item.path) 
                    ? alpha(theme.palette.common.white, 0.15)
                    : 'transparent',
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.1),
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Navigation - Simplified */}
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            gap: 1,
            alignItems: 'center' 
          }}>
            {navigationItems.slice(0, 2).map((item) => (
              <IconButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  color: 'white',
                  background: isActivePath(item.path) 
                    ? alpha(theme.palette.common.white, 0.15)
                    : 'transparent',
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.1),
                  },
                }}
              >
                <item.icon size={20} />
              </IconButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          minHeight: 'calc(100vh - 80px)',
          position: 'relative',
          background: '#f8f9fa',
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: 3,
            px: { xs: 2, sm: 3 },
            position: 'relative',
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Container maxWidth="xl">
          <Typography 
            variant="body2" 
            color="textSecondary" 
            align="center"
            sx={{ fontWeight: 400 }}
          >
            © 2025 Event Manager - Sistema de Gerenciamento de Eventos
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
