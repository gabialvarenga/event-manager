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
import EventForm from '../components/EventForm/EventForm';

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
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          color="inherit" 
          href="#" 
          onClick={() => navigate('/')}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Início
        </Link>
        <Link 
          color="inherit" 
          href="#" 
          onClick={() => navigate('/events')}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Eventos
        </Link>
        <Typography color="textPrimary">Criar Evento</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
          {/* Botão Voltar */}
          <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={() => navigate('/events')}
            sx={{
              color: 'white',
              mb: 2,
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Voltar para Eventos
          </Button>

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

      {/* Instruções */}
      <Alert 
        severity="info" 
        sx={{ 
          mb: 4,
          borderRadius: 2,
          background: alpha(theme.palette.info.main, 0.1),
          border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
        }}
      >
        <Typography variant="subtitle2" gutterBottom>
          Dicas para criar um evento eficaz:
        </Typography>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>Use um nome claro e descritivo</li>
          <li>Defina data e horários precisos</li>
          <li>Forneça um local específico</li>
          <li>Adicione uma descrição detalhada</li>
          <li>Escolha a categoria apropriada</li>
        </ul>
      </Alert>

      {/* Formulário */}
      <Paper sx={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        p: 4
      }}>
        <EventForm
          open={true}
          onClose={() => navigate('/events')}
          onSubmit={handleSubmit}
          loading={submitting}
        />
      </Paper>

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
