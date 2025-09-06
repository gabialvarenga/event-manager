import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Alert,
  Skeleton,
  useTheme,
  Fade
} from '@mui/material';
import {
  Calendar,
  Grid3X3,
  List as ListIcon
} from 'lucide-react';
import EventCard from '../EventCard/EventCard';

const EventList = ({ 
  events = [], 
  loading = false, 
  error = null,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  title = "Lista de Eventos"
}) => {
  const theme = useTheme();
  
  const [viewMode, setViewMode] = useState('grid');

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          borderRadius: 2,
          mb: 3 
        }}
      >
        <Typography variant="h6" gutterBottom>
          Erro ao carregar eventos
        </Typography>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        
        <Typography variant="body1" color="textSecondary">
          {loading ? 'Carregando eventos...' : `${events.length} evento(s) encontrado(s)`}
        </Typography>
      </Box>

      {/* Lista de eventos */}
      <Box>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={320}
                  sx={{ borderRadius: 2 }}
                  animation="wave"
                />
              </Grid>
            ))}
          </Grid>
        ) : events.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <Calendar size={64} color={theme.palette.text.secondary} />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
              Nenhum evento encontrado
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Não há eventos cadastrados ainda
            </Typography>
          </Box>
        ) : (
          <Fade in={!loading}>
            <Grid 
              container 
              spacing={3}
              sx={{
                '& .MuiGrid-item': {
                  transition: 'all 0.3s ease-in-out'
                }
              }}
            >
              {events.map((event) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={viewMode === 'grid' ? 6 : 12}
                  lg={viewMode === 'grid' ? 4 : 12}
                  key={event.id}
                >
                  <EventCard
                    event={event}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onView={onView}
                    showActions={showActions}
                    compact={viewMode === 'list'}
                  />
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default EventList;
