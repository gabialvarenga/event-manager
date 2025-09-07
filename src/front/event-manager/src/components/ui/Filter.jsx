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
import { Calendar, SortAsc, SortDesc, User, MapPin, Search, Tag } from 'lucide-react';
import { EVENT_CATEGORIES } from '../../constants';

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
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      {title && (
        <Typography variant="h6" sx={{ 
          mb: 3, 
          fontWeight: 600,
        }} className="gradient-text">
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {/* Filtros de Data */}
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
                value={filters.startDate || ''}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data Fim"
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar size={18} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Categoria */}
        <Grid item xs={12} >
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#718096' }}>
            Categoria
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth  sx={{ minWidth: "170px" }}>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={filters.category || ''}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  label="Categoria"
                  startAdornment={
                  <InputAdornment position="start">
                  <Tag size={20} />
                  </InputAdornment>
                }
                >
                  <MenuItem value="">Todas as categorias</MenuItem>
                  {EVENT_CATEGORIES.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>


        {/* Ordenação */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#718096' }}>
            Ordenação
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Ordenar por"
                >
                  <MenuItem value="eventDate">Data do evento</MenuItem>
                  <MenuItem value="name">Nome</MenuItem>
                  <MenuItem value="organizer">Organizador</MenuItem>
                  <MenuItem value="capacity">Capacidade</MenuItem>
                  <MenuItem value="price">Preço</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                variant="outlined"
                onClick={toggleSortOrder}
                startIcon={sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
                sx={{ 
                  height: '56px',
                  fontWeight: 600,
                }}
                fullWidth
              >
                {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {/* Filtros Avançados */}
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
                />
              </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'flex-end'}}>
                  <Button
                    variant="text"
                    color="error"
                    onClick={clearAllFilters}
                    sx={{
                      fontWeight: 600,
                      height: '56px',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Limpar Todos os Filtros
                  </Button>
                </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Filter;
