import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Alert,
  Skeleton,
  Fade
} from '@mui/material';
import EventCard from './EventCard';
import { MESSAGES } from '../../constants';

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
          className="gradient-text"
          sx={{ fontWeight: 700 }}
        >
          {title}
        </Typography>
        
        <Typography variant="body1" color="textSecondary">
          {loading ? MESSAGES.INFO.LOADING : `${events.length} evento(s) encontrado(s)`}
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
                  sx={{ borderRadius: 3 }}
                  animation="wave"
                />
              </Grid>
            ))}
          </Grid>
        ) : events.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              {MESSAGES.INFO.NO_EVENTS}
            </Typography>
            <Typography>
              Nenhum evento foi encontrado com os critérios selecionados.
            </Typography>
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {events.map((event, index) => (
              <Grid item xs={12} sm={6} lg={4} key={event.id}>
                <Fade in timeout={300 + (index * 100)}>
                  <Box>
                    <EventCard
                      event={event}
                      onEdit={onEdit ? () => onEdit(event) : undefined}
                      onDelete={onDelete ? () => onDelete(event) : undefined}
                      onView={onView ? () => onView(event) : undefined}
                      showActions={showActions}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default EventList;
