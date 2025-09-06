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
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Paper,
  Collapse,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Plus, Trash2, Edit, AlertTriangle, Search, Filter as FilterIcon, Calendar, MapPin, User, DollarSign, SortAsc, SortDesc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useEvents from '../hooks/useEvents';
import EventList from '../components/EventList/EventList';
import EventForm from '../components/EventForm/EventForm.jsx';
import Filter from '../components/Filter/Filter';


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
  
  // Estados para busca e filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quickFilters, setQuickFilters] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    organizer: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    category: ''
  });

  // Estados para ordenação
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState('asc');

  // Sugestões de busca
  const suggestions = [
    'hoje',
    'amanhã', 
    'nesta semana',
    'neste fim de semana',
    'na próxima semana',
    'neste mês'
  ];

  // Opções de filtros rápidos
  const quickFilterOptions = [
    { label: 'Eventos Hoje', value: 'today', color: '#FF6B35' },
    { label: 'Esta Semana', value: 'thisWeek', color: '#1E88E5' },
    { label: 'Workshops', value: 'workshop', color: '#4CAF50' },
    { label: 'Conferências', value: 'conference', color: '#9C27B0' }
  ];

  // Filtrar eventos baseado na busca e filtros
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtros rápidos
    quickFilters.forEach(filterValue => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      switch (filterValue) {
        case 'today':
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.eventDate);
            return eventDate.toDateString() === today.toDateString();
          });
          break;
        case 'thisWeek':
          filtered = filtered.filter(event => {
            const eventDate = new Date(event.eventDate);
            return eventDate >= today && eventDate <= nextWeek;
          });
          break;
        case 'workshop':
          filtered = filtered.filter(event => 
            event.category?.toLowerCase().includes('workshop') ||
            event.name.toLowerCase().includes('workshop')
          );
          break;
        case 'conference':
          filtered = filtered.filter(event => 
            event.category?.toLowerCase().includes('conferência') ||
            event.category?.toLowerCase().includes('conference') ||
            event.name.toLowerCase().includes('conferência')
          );
          break;
      }
    });

    // Filtros avançados
    if (filters.startDate) {
      filtered = filtered.filter(event => 
        new Date(event.eventDate) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(event => 
        new Date(event.eventDate) <= new Date(filters.endDate)
      );
    }
    if (filters.organizer) {
      filtered = filtered.filter(event => 
        event.organizer?.toLowerCase().includes(filters.organizer.toLowerCase())
      );
    }
    if (filters.location) {
      filtered = filtered.filter(event => 
        event.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.category) {
      filtered = filtered.filter(event => 
        event.category?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Tratar datas
      if (sortBy === 'eventDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      // Tratar números
      if (sortBy === 'capacity' || sortBy === 'price') {
        aValue = aValue || 0;
        bValue = bValue || 0;
      }

      // Tratar strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [events, searchTerm, quickFilters, filters, sortBy, sortOrder]);

  const handleQuickFilter = (filterValue) => {
    setQuickFilters(prev => 
      prev.includes(filterValue) 
        ? prev.filter(f => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setQuickFilters([]);
    setFilters({
      startDate: '',
      endDate: '',
      organizer: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      category: ''
    });
    setSortBy('eventDate');
    setSortOrder('asc');
    setShowSuggestions(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

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
      {/* Barra de Busca Principal com Botão de Filtros */}
      <Paper sx={{
        p: 2,
        mb: 3,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        position: 'relative'
      }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1, position: 'relative' }}>
            <TextField
              fullWidth
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#718096" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #e9ecef',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #1E88E5',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid #1E88E5',
                  },
                }
              }}
            />
            
            {/* Sugestões */}
                  {showSuggestions && (
                    <Paper sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    zIndex: 1000,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    background: 'white'
                    }}>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ 
                      mb: 2, 
                      fontWeight: 600, 
                      color: '#2D3748',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                      }}>
                      Sugestões
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {suggestions.map((suggestion, index) => (
                        <Chip
                        key={index}
                        label={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 4,
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#718096',
                          borderColor: '#e9ecef',
                          backgroundColor: '#f8f9fa',
                          cursor: 'pointer',
                          '&:hover': {
                          backgroundColor: '#e9ecef',
                          borderColor: '#1E88E5',
                          color: '#1E88E5',
                          }
                        }}
                        />
                      ))}
                      </Box>
                    </Box>
                    </Paper>
                  )}
                  </Box>
                  
                  <IconButton
            startIcon={<Filter size={18} />}
            onClick={() => setShowFilters(!showFilters)}
                  sx={{
                    borderRadius: 2,
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

                
                {/* Lista de Eventos */}
      <EventList
        events={filteredEvents}
        loading={loading}
        error={error}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        onView={handleViewEvent}
        title="Meus Eventos"
        emptyMessage={
          filteredEvents.length === 0 && events.length > 0
            ? "Nenhum evento encontrado com os filtros aplicados."
            : undefined
        }
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
