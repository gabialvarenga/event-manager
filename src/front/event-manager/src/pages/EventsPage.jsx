import React, { useState, useMemo } from 'react';
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
  TextField,
  InputAdornment,
  IconButton,
  Collapse,
  Paper
} from '@mui/material';
import { 
  Plus, 
  Trash2, 
  Edit, 
  AlertTriangle, 
  Search, 
  Filter as FilterIcon,
  CheckCircle,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventList from '../components/ui/EventList';
import EventForm from '../components/features/EventForm';
import Filter from '../components/ui/Filter';
import { ROUTES, MESSAGES } from '../constants';
import { debounce } from '../utils/formatters';

const EventsPage = () => {
  const navigate = useNavigate();
  const { 
    events, 
    loading, 
    error, 
    createEvent, 
    updateEvent, 
    deleteEvent,
    clearError,
    searchEvents
  } = useEvents();

  // Estados do formulário
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Estados de notificação
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Estados de confirmação de exclusão
  const [deleteDialog, setDeleteDialog] = useState({ 
    open: false, 
    event: null 
  });

  // Estados de busca e filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    organizer: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    category: ''
  });

  // Estados de ordenação
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      if (term.trim()) {
        searchEvents(term, filters);
      }
    }, 300),
    [searchEvents, filters]
  );

  // Aplicar busca quando o termo muda
  React.useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  // Filtrar e ordenar eventos
  const filteredAndSortedEvents = useMemo(() => {
    let result = [...events];

    // Aplicar filtros de busca se não houver termo de pesquisa
    if (!searchTerm) {
      // Aplicar filtros
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        result = result.filter(event => {
          const eventDate = new Date(event.eventDate);
          return eventDate >= startDate;
        });
      }

      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        result = result.filter(event => {
          const eventDate = new Date(event.eventDate);
          return eventDate <= endDate;
        });
      }

      if (filters.category) {
        result = result.filter(event => event.category === filters.category);
      }

      if (filters.organizer) {
        result = result.filter(event => 
          event.organizer.toLowerCase().includes(filters.organizer.toLowerCase())
        );
      }

      if (filters.location) {
        result = result.filter(event => 
          event.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.minPrice) {
        result = result.filter(event => 
          event.price === null || event.price >= parseFloat(filters.minPrice)
        );
      }

      if (filters.maxPrice) {
        result = result.filter(event => 
          event.price === null || event.price <= parseFloat(filters.maxPrice)
        );
      }
    }

    // Aplicar ordenação
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Tratamento especial para campos de data
      if (sortBy === 'eventDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Tratamento especial para campos numéricos
      if (sortBy === 'capacity' || sortBy === 'price') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }

      // Tratamento especial para strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [events, searchTerm, filters, sortBy, sortOrder]);

  // Handlers
  const handleSubmit = async (eventData) => {
    setSubmitting(true);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
        showNotification(MESSAGES.SUCCESS.EVENT_UPDATED, 'success');
      } else {
        await createEvent(eventData);
        showNotification(MESSAGES.SUCCESS.EVENT_CREATED, 'success');
      }
      setShowForm(false);
      setEditingEvent(null);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (event) => {
    setDeleteDialog({ open: true, event });
  };

  const confirmDelete = async () => {
    try {
      await deleteEvent(deleteDialog.event.id);
      showNotification(MESSAGES.SUCCESS.EVENT_DELETED, 'success');
      setDeleteDialog({ open: false, event: null });
    } catch (error) {
      showNotification(error.message, 'error');
    }
  };

  const handleView = (event) => {
    navigate(`/events/${event.id}`);
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '', severity: 'success' });
  };

  const clearAllFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      organizer: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      category: ''
    });
    setSearchTerm('');
    setSortBy('eventDate');
    setSortOrder('asc');
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Box>
      {/* Header com busca */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          className="gradient-text"
          sx={{ fontWeight: 700 }}
        >
          Gerenciar Eventos
        </Typography>
        
        <Paper sx={{ 
          p: 2, 
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <X size={16} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                color: showFilters ? '#1E88E5' : '#718096',
                '&:hover': {
                  color: '#1E88E5',
                  backgroundColor: 'rgba(30, 136, 229, 0.04)'
                }
              }}
            >
              <FilterIcon size={20} />
            </IconButton>
          </Box>
        </Paper>
      </Box>

      {/* Filtros Avançados */}
      <Box sx={{ mb: 3 }}>
        <Collapse in={showFilters}>
          <Filter
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
            clearAllFilters={clearAllFilters}
            showAdvanced={true}
            title="Filtros Avançados"
          />
        </Collapse>
      </Box>

      {/* Lista de eventos */}
      <EventList
        events={filteredAndSortedEvents}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        showActions={true}
        title=""
      />

      {/* FAB para criar evento */}
      <Fab
        color="primary"
        aria-label="criar evento"
        onClick={() => {
          setEditingEvent(null);
          setShowForm(true);
        }}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1565C0 0%, #0d47a1 100%)',
          }
        }}
      >
        <Plus size={24} />
      </Fab>

      {/* Formulário de evento */}
      <EventForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingEvent(null);
        }}
        onSubmit={handleSubmit}
        event={editingEvent}
        loading={submitting}
      />

      {/* Dialog de confirmação de exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, event: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AlertTriangle size={24} color="#f44336" />
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
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, event: null })}
          >
            Cancelar
          </Button>
          <Button 
            onClick={confirmDelete}
            color="error"
            variant="contained"
            startIcon={<Trash2 size={18} />}
          >
            Excluir
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
          icon={notification.severity === 'success' ? <CheckCircle size={20} /> : undefined}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventsPage;
