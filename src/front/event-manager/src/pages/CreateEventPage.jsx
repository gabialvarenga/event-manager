import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Alert,
  Snackbar,
  Button,
  useTheme,
  alpha,
  Breadcrumbs,
  Link
} from '@mui/material';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventForm from '../components/EventForm/EventForm.jsx';

const CreateEventPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { createEvent } = useEvents();
  
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (eventData) => {
    setSubmitting(true);
    try {
      const newEvent = await createEvent(eventData);
      showNotification('Evento criado com sucesso!', 'success');
      
      // Aguardar um pouco para mostrar a notificação e redirecionar
      setTimeout(() => {
        navigate('/events');
      }, 1500);
      
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: 'success' });
  };

  return (
    <Box>
      {/* Header */}
      <Paper sx={{
        background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
        color: 'white',
        borderRadius: 3,
        p: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Calendar size={40} />
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                Criar Novo Evento
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Preencha as informações abaixo para criar seu evento
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Formulário */}
        <EventForm
          open={true}
          onSubmit={handleSubmit}
          loading={submitting}
          isPage={true}
        />
   

      {/* Notificações */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
          icon={notification.severity === 'success' ? <CheckCircle size={20} /> : undefined}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateEventPage;
