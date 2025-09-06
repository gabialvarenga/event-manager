import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  Snackbar,
  Fab,
  useTheme,
  alpha
} from '@mui/material';
import { Plus, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventList from '../components/EventList/EventList';
import EventForm from '../components/EventForm/EventForm';

const EventsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { 
    events, 
    loading, 
    error, 
    createEvent, 
    updateEvent, 
    deleteEvent,
    clearError 
  } = useEvents();

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, event: null });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [submitting, setSubmitting] = useState(false);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = (event) => {
    setDeleteDialog({ open: true, event });
  };

  const handleViewEvent = (event) => {
    // Implementar visualização detalhada ou navegar para página de detalhes
    navigate(`/events/${event.id}`);
  };

  const handleFormSubmit = async (eventData) => {
    setSubmitting(true);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
        showNotification('Evento atualizado com sucesso!', 'success');
      } else {
        await createEvent(eventData);
        showNotification('Evento criado com sucesso!', 'success');
      }
      setShowForm(false);
      setEditingEvent(null);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteDialog.event) return;

    try {
      await deleteEvent(deleteDialog.event.id);
      showNotification('Evento excluído com sucesso!', 'success');
      setDeleteDialog({ open: false, event: null });
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: 'success' });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    clearError();
  };

  return (
    <Box>
      {/* Lista de Eventos */}
      <EventList
        events={events}
        loading={loading}
        error={error}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        onView={handleViewEvent}
        title="Gerenciar Eventos"
      />

      {/* Botão Flutuante para Criar Evento */}
      <Fab
        color="primary"
        size="large"
        onClick={handleCreateEvent}
        sx={{
          position: 'fixed',
          bottom: { xs: 80, md: 24 },
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
        }}
      >
        <Plus size={24} />
      </Fab>

      {/* Modal de Formulário */}
      <EventForm
        open={showForm}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        event={editingEvent}
        loading={submitting}
      />

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, event: null })}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: theme.palette.error.main 
        }}>
          <AlertTriangle size={24} />
          Confirmar Exclusão
        </DialogTitle>
        
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o evento "{deleteDialog.event?.name}"?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setDeleteDialog({ open: false, event: null })}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>
          
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            startIcon={<Trash2 size={16} />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Excluir Evento
          </Button>
        </DialogActions>
      </Dialog>

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
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventsPage;
