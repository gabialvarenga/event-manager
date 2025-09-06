import React from 'react';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Typography
} from '@mui/material';
import { Calendar, SortAsc, SortDesc, User, MapPin, DollarSign } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../services/eventService';

const Filter = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  sortOrder,
  toggleSortOrder,
  clearAllFilters,
  showAdvanced = true,
  title = "Filtros"
}) => {
  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: 3, 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      {title && (
        <Typography variant="h6" sx={{ 
          mb: 3, 
          fontWeight: 600, 
          color: '#1E88E5',
          background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {/* Primeira linha - Filtros de Data */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#718096' }}>
            Período
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data Início"
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data Fim"
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Segunda linha - Categoria e Ordenação */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#718096' }}>
            Categoria e Ordenação
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  label="Categoria"
                  sx={{ 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                  }}
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Ordenar por"
                  sx={{ 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <MenuItem value="eventDate">Data do evento</MenuItem>
                  <MenuItem value="name">Nome</MenuItem>
                  <MenuItem value="organizer">Organizador</MenuItem>
                  <MenuItem value="capacity">Capacidade</MenuItem>
                  <MenuItem value="price">Preço</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                onClick={toggleSortOrder}
                startIcon={sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                sx={{ 
                  borderRadius: 2,
                  textTransform: 'none',
                  height: '56px',
                  fontWeight: 600,
                  borderColor: '#1E88E5',
                  color: '#1E88E5',
                  background: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    borderColor: '#1565C0',
                    color: '#1565C0',
                    backgroundColor: 'rgba(30, 136, 229, 0.04)'
                  }
                }}
                fullWidth
              >
                {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Terceira linha - Filtros Avançados */}
        {showAdvanced && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#718096' }}>
              Filtros Específicos
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Organizador"
                  value={filters.organizer || ''}
                  onChange={(e) => setFilters({ ...filters, organizer: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={18} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Local"
                  value={filters.location || ''}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapPin size={18} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Preço Mínimo"
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        R$
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Preço Máximo"
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        R$
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: 'rgba(255, 255, 255, 0.9)',
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Botão Limpar Filtros */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={clearAllFilters}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderColor: '#dc3545',
                color: '#dc3545',
                background: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  borderColor: '#c82333',
                  color: '#c82333',
                  backgroundColor: 'rgba(220, 53, 69, 0.04)'
                }
              }}
            >
              Limpar Todos os Filtros
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Filter;
