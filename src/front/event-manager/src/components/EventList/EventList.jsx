import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Alert,
  Skeleton,
  useTheme,
  alpha,
  Fade,
  Collapse
} from '@mui/material';
import {
  Search,
  Filter,
  Calendar,
  SortAsc,
  SortDesc,
  Grid3X3,
  List as ListIcon
} from 'lucide-react';
import EventCard from '../EventCard/EventCard';
import { EVENT_CATEGORIES } from '../../services/eventService';
import { debounce } from '../../utils/formatters';

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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleSearchChange = (event) => {
    debouncedSearch(event.target.value);
  };

  // Filtrar e ordenar eventos
  const filteredAndSortedEvents = React.useMemo(() => {
    let filtered = events;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(event => event.category === selectedCategory);
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
  }, [events, searchTerm, selectedCategory, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('eventDate');
    setSortOrder('asc');
  };

  const activeFiltersCount = [searchTerm, selectedCategory].filter(Boolean).length;

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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </Typography>
        
        <Typography variant="body1" color="textSecondary">
          {loading ? 'Carregando eventos...' : `${filteredAndSortedEvents.length} evento(s) encontrado(s)`}
        </Typography>
      </Box>

      {/* Filtros e Busca */}
      <Box sx={{ mb: 3 }}>
        {/* Barra de busca e controles */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 2,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' }
        }}>
          {/* Busca */}
          <TextField
            placeholder="Buscar eventos..."
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }
            }}
          />

          {/* Controles */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            flexDirection: { xs: 'row', md: 'row' }
          }}>
            <Button
              variant={showFilters ? "contained" : "outlined"}
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<Filter size={18} />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                minWidth: 'auto',
                position: 'relative'
              }}
            >
              Filtros
              {activeFiltersCount > 0 && (
                <Chip
                  size="small"
                  label={activeFiltersCount}
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    height: 20,
                    minWidth: 20,
                    fontSize: '0.7rem'
                  }}
                />
              )}
            </Button>

            <Button
              variant="outlined"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              sx={{ 
                borderRadius: 2,
                minWidth: 'auto',
                px: 2
              }}
            >
              {viewMode === 'grid' ? <ListIcon size={18} /> : <Grid3X3 size={18} />}
            </Button>
          </Box>
        </Box>

        {/* Filtros avançados */}
        <Collapse in={showFilters}>
          <Box sx={{ 
            p: 3,
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            mb: 2
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Categoria"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">Todas as categorias</MenuItem>
                    {EVENT_CATEGORIES.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Ordenar por</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Ordenar por"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="eventDate">Data do evento</MenuItem>
                    <MenuItem value="name">Nome</MenuItem>
                    <MenuItem value="organizer">Organizador</MenuItem>
                    <MenuItem value="capacity">Capacidade</MenuItem>
                    <MenuItem value="price">Preço</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{ display: 'flex', gap: 1, height: '100%', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={toggleSortOrder}
                    startIcon={sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      flex: 1
                    }}
                  >
                    {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
                  </Button>

                  <Button
                    variant="text"
                    onClick={clearFilters}
                    sx={{ 
                      borderRadius: 2,
                      textTransform: 'none',
                      color: theme.palette.error.main
                    }}
                  >
                    Limpar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
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
        ) : filteredAndSortedEvents.length === 0 ? (
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
              {searchTerm || selectedCategory 
                ? 'Tente ajustar os filtros para encontrar eventos'
                : 'Não há eventos cadastrados ainda'
              }
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
              {filteredAndSortedEvents.map((event) => (
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
