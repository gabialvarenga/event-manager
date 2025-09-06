import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  useTheme,
  alpha,
  Fade,
  Card,
  CardContent
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  X,
  TrendingUp,
  Clock
} from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import useEvents from '../hooks/useEvents';
import EventList from '../components/EventList/EventList';
import { EVENT_CATEGORIES } from '../services/eventService';
import { debounce } from '../utils/formatters';

dayjs.locale('pt-br');

const SearchPage = () => {
  const theme = useTheme();
  const { events, loading, error, searchEvents, getEventsByCategory, getEventsByDateRange } = useEvents();
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    startDate: null,
    endDate: null,
    organizer: ''
  });
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce(async (term, currentFilters) => {
    if (!term.trim() && !hasActiveFilters(currentFilters)) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setSearching(true);
    try {
      let results = [];

      if (term.trim()) {
        results = await searchEvents(term);
      } else {
        results = events;
      }

      // Aplicar filtros
      results = applyFilters(results, currentFilters);
      
      setSearchResults(results);
      setHasSearched(true);
    } catch (error) {
      console.error('Erro na busca:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, 500);

  const hasActiveFilters = (filters) => {
    return filters.category || filters.startDate || filters.endDate || filters.organizer.trim();
  };

  const applyFilters = (results, filters) => {
    let filtered = [...results];

    if (filters.category) {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters.organizer.trim()) {
      filtered = filtered.filter(event => 
        event.organizer.toLowerCase().includes(filters.organizer.toLowerCase())
      );
    }

    if (filters.startDate) {
      filtered = filtered.filter(event => {
        const eventDate = dayjs(event.eventDate);
        return eventDate.isAfter(filters.startDate) || eventDate.isSame(filters.startDate, 'day');
      });
    }

    if (filters.endDate) {
      filtered = filtered.filter(event => {
        const eventDate = dayjs(event.eventDate);
        return eventDate.isBefore(filters.endDate) || eventDate.isSame(filters.endDate, 'day');
      });
    }

    return filtered;
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value, filters);
  };

  const handleFilterChange = (filterName) => (value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    debouncedSearch(searchTerm, newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      startDate: null,
      endDate: null,
      organizer: ''
    });
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.organizer.trim()) count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    return count;
  };

  const QuickSearchButton = ({ label, onClick, icon: Icon, color }) => (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<Icon size={16} />}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        borderColor: alpha(color, 0.3),
        color: color,
        '&:hover': {
          background: alpha(color, 0.1),
          borderColor: color,
        }
      }}
    >
      {label}
    </Button>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box>
        {/* Header */}
        <Paper sx={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          borderRadius: 3,
          p: 4,
          mb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}>
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
              <Search size={40} />
              <Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
                  Buscar Eventos
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Encontre exatamente o que você procura
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Barra de Busca Principal */}
        <Paper sx={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          p: 3,
          mb: 4
        }}>
          <TextField
            fullWidth
            placeholder="Digite o nome do evento, local, organizador..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={24} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSearchResults([]);
                      setHasSearched(false);
                    }}
                    sx={{ minWidth: 'auto', p: 0.5 }}
                  >
                    <X size={16} />
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: '1.1rem',
                background: 'white',
                '& fieldset': {
                  border: 'none',
                },
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }
            }}
          />
        </Paper>

        {/* Buscas Rápidas */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Buscas Rápidas
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <QuickSearchButton
                label="Eventos Hoje"
                onClick={() => {
                  const today = dayjs();
                  setFilters(prev => ({ ...prev, startDate: today, endDate: today }));
                  debouncedSearch(searchTerm, { ...filters, startDate: today, endDate: today });
                }}
                icon={Clock}
                color="#fa709a"
              />
              <QuickSearchButton
                label="Esta Semana"
                onClick={() => {
                  const today = dayjs();
                  const nextWeek = today.add(7, 'day');
                  setFilters(prev => ({ ...prev, startDate: today, endDate: nextWeek }));
                  debouncedSearch(searchTerm, { ...filters, startDate: today, endDate: nextWeek });
                }}
                icon={Calendar}
                color="#4facfe"
              />
              <QuickSearchButton
                label="Workshops"
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: 'WORKSHOP' }));
                  debouncedSearch(searchTerm, { ...filters, category: 'WORKSHOP' });
                }}
                icon={TrendingUp}
                color="#43e97b"
              />
              <QuickSearchButton
                label="Conferências"
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: 'CONFERENCE' }));
                  debouncedSearch(searchTerm, { ...filters, category: 'CONFERENCE' });
                }}
                icon={User}
                color="#667eea"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Filtros Avançados */}
        <Paper sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 3,
          p: 3,
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Filter size={20} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Filtros Avançados
              </Typography>
              {getActiveFiltersCount() > 0 && (
                <Chip
                  label={`${getActiveFiltersCount()} ativo(s)`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                onClick={clearFilters}
                variant="text"
                color="error"
                startIcon={<X size={16} />}
                sx={{ textTransform: 'none' }}
              >
                Limpar Filtros
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category')(e.target.value)}
                  label="Categoria"
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {EVENT_CATEGORIES.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Data Início"
                value={filters.startDate}
                onChange={handleFilterChange('startDate')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Data Fim"
                value={filters.endDate}
                onChange={handleFilterChange('endDate')}
                minDate={filters.startDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Organizador"
                value={filters.organizer}
                onChange={(e) => handleFilterChange('organizer')(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Resultados */}
        <Box>
          {searching && (
            <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
              Buscando eventos...
            </Alert>
          )}

          {hasSearched && !searching && (
            <Fade in>
              <Box>
                <EventList
                  events={searchResults}
                  loading={false}
                  error={null}
                  title={`Resultados da Busca (${searchResults.length})`}
                  showActions={false}
                />
              </Box>
            </Fade>
          )}

          {!hasSearched && !searching && (
            <Paper sx={{
              p: 6,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3
            }}>
              <Search size={48} color={theme.palette.text.secondary} />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2, mb: 1 }}>
                Digite algo para começar a busca
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Use a barra de busca acima ou os filtros para encontrar eventos específicos
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchPage;
