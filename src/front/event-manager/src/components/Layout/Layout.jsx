import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Tooltip,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  Calendar,
  Home,
  Plus,
  List,
  Search,
  Settings,
  Menu as MenuIcon
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/events', icon: List, label: 'Eventos' },
    { path: '/create', icon: Plus, label: 'Criar Evento' },
    { path: '/search', icon: Search, label: 'Buscar' },
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Calendar size={32} color="white" />
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
                  background: isActivePath(item.path) 
                    ? alpha(theme.palette.common.white, 0.2)
                    : 'transparent',
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.1),
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Settings */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title="Configurações">
              <IconButton 
                color="inherit"
                sx={{
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.1),
                    transform: 'rotate(90deg)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Settings size={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Mobile */}
      <Box 
        sx={{ 
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
          zIndex: 1000,
          px: 1,
          py: 1,
        }}
      >
        {navigationItems.map((item) => (
          <Button
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              flex: 1,
              flexDirection: 'column',
              gap: 0.5,
              py: 1,
              color: 'white',
              minWidth: 'auto',
              borderRadius: 2,
              background: isActivePath(item.path) 
                ? alpha(theme.palette.common.white, 0.2)
                : 'transparent',
              '&:hover': {
                background: alpha(theme.palette.common.white, 0.1),
              },
            }}
          >
            <item.icon size={20} />
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              {item.label}
            </Typography>
          </Button>
        ))}
      </Box>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          pb: { xs: 10, md: 0 }, // Espaço para navegação mobile
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)
            `,
            zIndex: -1,
          }}
        />
        
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
          py: 3,
          px: 2,
          background: alpha(theme.palette.grey[100], 0.8),
          backdropFilter: 'blur(10px)',
          borderTop: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Container maxWidth="xl">
          <Typography 
            variant="body2" 
            color="textSecondary" 
            align="center"
            sx={{ fontWeight: 500 }}
          >
            © 2025 Event Manager - Sistema Inovador de Gerenciamento de Eventos
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
